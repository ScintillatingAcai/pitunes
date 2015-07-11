var IncidentType = require('../db/models/incidentType');
var IncidentTypes = require('../db/collections/incidentTypes');

var types = [
  {
    'type': 'Vandalism',
    'iconFilename': 'vandalism.png'
  },
  {
    'type': 'Theft',
    'iconFilename': 'theft.png'
  },
  {
    'type': 'Fight',
    'iconFilename': 'fight.png'
  },
  {
    'type': 'Drug use',
    'iconFilename': 'drug_use.png'
  },
  {
    'type': 'Pedestrian Hazard',
    'iconFilename': 'ped_hazard.png'
  },
  {
    'type': 'Break In',
    'iconFilename': 'break_in.png'
  },
  {
    'type': 'Aggressive Person',
    'iconFilename': 'aggro_per.png'
  },
  {
    'type': 'Mugging',
    'iconFilename': 'mugging.png'
  },
  {
    'type': 'Gun Use',
    'iconFilename': 'gunshot.png'
  },
  {
    'type': 'Other Danger',
    'iconFilename': 'other.png'
  }
];

var createIncidentType = function (type, iconFilename) {
  new IncidentType({'type': type}).fetch().then(function(found) {
    if(!found) {
      new IncidentType({ 
        'type': type,
        'iconFilename': iconFilename
      }).save().then(function (newIncidentType) {
        IncidentTypes.add(newIncidentType);
        console.log('added new incidentType');
      });
    }
  });
}
var type;

for(var i = 0; i < types.length; i++) {
  type = types[i];
  createIncidentType(type.type, type.iconFilename);
}
