baseOVHKonnector = require '../lib/base_ovh_konnector'

name = 'SoYouStart CA'
slug = 'soyoustart_ca'
link = 'www.soyoustart.com'

api =
    endpoint: 'soyoustart-ca'
    appKey: ''
    appSecret: ''

connector = module.exports = baseOVHKonnector.createNew(api, name, slug, link)

