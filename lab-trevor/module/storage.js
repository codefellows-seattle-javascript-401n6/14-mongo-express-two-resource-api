const db = require('./db-storage');
const Team = require('../model/teams').Team;
const Owner = require('../model/teams').Owner;

function seed(storage){
    return db.removeAll()
    .then(() => {
        return Promise.all([
            db.save(new Team({location: 'Chicago', mascot:  'Bears', division: 'NFC North'}), new Owner({name:'Bob'})),
            db.save(new Team({location: 'Minneapolis', mascot:  'Vikings', division: 'NFC North'}),new Owner({name:'Bob'})),
            db.save(new Team({location: 'Green Bay', mascot:  'Packers', division: 'NFC North'}),new Owner({name:'Bob'})),
            db.save(new Team({location: 'Detroit', mascot:  'Lions', division: 'NFC North'}),new Owner({name:'Bob'})),
            db.save(new Team({location: 'Seattle', mascot:  'Seahawks', division: 'NFC West'}),new Owner({name:'Bob'})),
            db.save(new Team({location: 'San Francisco', mascot:  '49ers', division: 'NFC West'}),new Owner({name:'Bob'})),
            db.save(new Team({location: 'Arizona', mascot:  'Cardinals', division: 'NFC West'}),new Owner({name:'Bob'})),
            db.save(new Team({location: 'Los Angeles', mascot:  'Rams', division: 'NFC West'}),new Owner({name:'Bob'})),
        ])
    })
}

module.exports = {seed, Team, Owner, db};