class dbObject {
  constructor (dbname) {
    this.source = dbname;
  }
  listCityNames() {
    const lstCity = this.citylist.map(x => ({'id': x.id, 'name': x.name}));
    return  lstCity;
  }
  getWetherByCity(city) {
    const selCity = this.citylist.find(x => x.name === city);
    return  selCity;
  }  
};

module.exports = dbObject;