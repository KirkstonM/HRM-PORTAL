import LocaleModel from '../Schemas/locale.schema.js'

//@GET ALL LOCALE VALUE;

const getLocale = async (req, res) => {
  try {
    const localeValues = await LocaleModel.find()
    res.status(200).json({ data: localeValues })
  } catch (error) {
    res.status(500).json({ msg: 'Server Error', error })
  }
}

//@POST INSERT LOCALE VALUES

const addLocale = async (req, res) => {
  try {
    const localeData = req.body
    if (!localeData || Object.keys(localeData).length === 0) {
      return res.status(400).json({ msg: 'No data available' })
    }
    for (const key in localeData) {
      const localeExist = await LocaleModel.findOne({
        [`values.${key}`]: { $exists: true }
      })
      if (localeExist) {
        return res.status(400).json({ msg: `The key "${key}" already exists!` })
      }
    }
    await LocaleModel.create({ values: localeData })
    res.status(201).json({ msg: 'Localization values added successfully' })
  } catch (error) {
    res.status(500).json({ msg: 'Server Error', error })
  }
}

export { getLocale, addLocale }
