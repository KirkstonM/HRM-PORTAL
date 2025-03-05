import mongoose from 'mongoose'

const localeSchema = mongoose.Schema({
  values: {
    type: Map,
    of: String,
    required: true
  }
})

const LocaleModel = mongoose.model('Localization', localeSchema)
export default LocaleModel
