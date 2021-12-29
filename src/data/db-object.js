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
  getSearchByCity(keyWord) {
    let search = `^${keyWord}`;
    let regex = new RegExp(search, 'g');
    const selCity = this.citylist.filter(x => regex.test(x.name));
    return  selCity;
  }  
};

module.exports = dbObject;