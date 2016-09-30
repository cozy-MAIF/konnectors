// Generated by CoffeeScript 1.10.0
var Bill, File, async, baseKonnector, buildNotification, checkLogin, cheerio, cozydb, customLinkBankOperation, fileOptions, filterExisting, fs, getPdf, linkBankOperation, localization, log, logIn, moment, parsePage, request, saveDataAndFile;

cozydb = require('cozydb');

request = require('request');

moment = require('moment');

cheerio = require('cheerio');

fs = require('fs');

async = require('async');

File = require('../models/file');

Bill = require('../models/bill');

baseKonnector = require('../lib/base_konnector');

filterExisting = require('../lib/filter_existing');

saveDataAndFile = require('../lib/save_data_and_file');

linkBankOperation = require('../lib/link_bank_operation');

localization = require('../lib/localization_manager');

log = require('printit')({
  prefix: "Ameli",
  date: true
});

checkLogin = function(requiredFields, billInfos, data, next) {
  if (requiredFields.login.length > 13) {
    log.error("Login with " + requiredFields.login.length + " digits : refused");
    return next('bad credentials');
  } else {
    return next();
  }
};

logIn = function(requiredFields, billInfos, data, next) {
  var form, loginUrl, options, reimbursementUrl, submitUrl;
  loginUrl = "https://assure.ameli.fr/PortailAS/appmanager/PortailAS/" + "assure?_nfpb=true&_pageLabel=as_login_page";
  submitUrl = "https://assure.ameli.fr/PortailAS/appmanager/PortailAS/" + "assure?_nfpb=true&_windowLabel=connexioncompte_2&connexioncompte_2_" + "actionOverride=/portlets/connexioncompte/validationconnexioncompte&" + "_pageLabel=as_login_page";
  reimbursementUrl = "https://assure.ameli.fr/PortailAS/appmanager/" + "PortailAS/assure?_nfpb=true&_pageLabel=as_dernier_paiement_page";
  form = {
    "connexioncompte_2numSecuriteSociale": requiredFields.login,
    "connexioncompte_2codeConfidentiel": requiredFields.password,
    "connexioncompte_2actionEvt": "connecter",
    "submit": "Valider"
  };
  options = {
    method: 'GET',
    jar: true,
    strictSSL: false,
    url: loginUrl
  };
  return request(options, function(err, res, body) {
    var loginOptions;
    if (err != null) {
      return next(err);
    }
    loginOptions = {
      method: 'POST',
      form: form,
      jar: true,
      strictSSL: false,
      url: submitUrl,
      headers: {
        'Cookie': res.headers['set-cookie'],
        'Referer': 'https://assure.ameli.fr/PortailAS/appmanager/' + 'PortailAS/assure?_nfpb=true&_pageLabel=' + 'as_login_page'
      }
    };
    return request(loginOptions, function(err, res, body) {
      var isNotLogedIn, reimbursementOptions;
      isNotLogedIn = body.indexOf('Connexion à mon compte') > -1;
      if (err || isNotLogedIn) {
        log.error("Authentification error");
        return next('bad credentials');
      } else {
        reimbursementOptions = {
          method: 'GET',
          jar: true,
          strictSSL: false,
          url: reimbursementUrl
        };
        return request(reimbursementOptions, function(err, res, body) {
          if (err) {
            return next(err);
          } else {
            data.html = body;
            return next();
          }
        });
      }
    });
  });
};

parsePage = function(requiredFields, healthBills, data, next) {
  var $;
  healthBills.fetched = [];
  if (data.html == null) {
    return next();
  }
  $ = cheerio.load(data.html);
  $('#tabDerniersPaiements tbody tr').each(function() {
    var amount, bill, date, detailsUrl, subtype;
    date = $($(this).find('td').get(0)).text();
    subtype = $($(this).find('td').get(1)).text();
    amount = $($(this).find('td').get(2)).text();
    amount = amount.replace(' euros', '').replace(',', '.');
    amount = parseFloat(amount);
    detailsUrl = $($(this).find('td a').get(1)).attr('href');
    detailsUrl = detailsUrl.replace(':443', '');
    bill = {
      amount: amount,
      type: 'health',
      subtype: subtype,
      date: moment(date, 'DD/MM/YYYY'),
      vendor: 'Ameli',
      detailsUrl: detailsUrl
    };
    if (bill.amount != null) {
      return healthBills.fetched.push(bill);
    }
  });
  return async.each(healthBills.fetched, getPdf, function(err) {
    return next(err);
  });
};

getPdf = function(bill, callback) {
  var detailsUrl, options;
  detailsUrl = bill.detailsUrl;
  options = {
    method: 'GET',
    jar: true,
    strictSSL: false,
    url: detailsUrl
  };
  return request(options, function(err, res, body) {
    var html, pdfUrl;
    if ((err != null) || res.statusCode !== 200) {
      return callback(new Error('Pdf not found'));
    } else {
      html = cheerio.load(body);
      pdfUrl = "https://assure.ameli.fr";
      pdfUrl += html('.r_lien_pdf').attr('href');
      pdfUrl = pdfUrl.replace(/(?:\r\n|\r|\n|\t)/g, '');
      bill.pdfurl = pdfUrl;
      return callback(null);
    }
  });
};

buildNotification = function(requiredFields, healthBills, data, next) {
  var localizationKey, notifContent, options, ref;
  log.info("Import finished");
  notifContent = null;
  if ((healthBills != null ? (ref = healthBills.filtered) != null ? ref.length : void 0 : void 0) > 0) {
    localizationKey = 'notification ameli';
    options = {
      smart_count: healthBills.filtered.length
    };
    healthBills.notifContent = localization.t(localizationKey, options);
  }
  return next();
};

customLinkBankOperation = function(requiredFields, healthBills, data, next) {
  var identifier;
  identifier = 'C.P.A.M.';
  if (requiredFields.bank_identifier !== "") {
    identifier = requiredFields.bank_identifier;
  }
  return linkBankOperation({
    log: log,
    model: Bill,
    identifier: identifier,
    dateDelta: 10,
    amountDelta: 0.1
  })(requiredFields, healthBills, data, next);
};

fileOptions = {
  vendor: 'ameli',
  dateFormat: 'YYYYMMDD'
};

module.exports = baseKonnector.createNew({
  name: "Ameli",
  vendorLink: "http://www.ameli.fr/",
  fields: {
    login: "text",
    password: "password",
    bank_identifier: "string",
    folderPath: "folder"
  },
  models: [Bill],
  fetchOperations: [checkLogin, logIn, parsePage, filterExisting(log, Bill), saveDataAndFile(log, Bill, fileOptions, ['health', 'bill']), customLinkBankOperation, buildNotification]
});