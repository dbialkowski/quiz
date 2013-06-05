/*exports.baza = [
{ "lp": "", "words": "Vavamuffin: ...Regenerrator Kocha Jah Jah, Vavamuffin Wielbi Pana...", 
	"tit1": "Wektor", "tit2": "Bless", "tit3": "Sekta", "tit4": "Paramonov", "answ": "Sekta" },

{ "lp": "", "words": "Republika: ...Ta Piosenka Jest, Pisana Dla Pieniedzy...", 
	"tit1": "Mamona", "tit2": "Urszula", "tit3": "Pobliskie", "tit4": "Kasa", "answ": "Mamona" },

{ "lp": "", "words": "Bon Jovi: ....Whooah, We Are Half Way There ", 
	"tit1": "Its My Life", "tit2": "Livin On A Prayer", "tit3": "Bad Name", "tit4": "Old School", "answ": "Livin On A Prayer" },

{ "lp": "", "words": "Coma: ...A Moze Ja Jestem Odpowiesc Zmeczonych Ust...", 
	"tit1": "Dziele Na Pol", "tit2": "Zly Dzien", "tit3": "Piosenka Pisana Noca", "tit4": "Rasta", "answ": "Piosenka Pisana Noca" },

{ "lp": "", "words": "Wilki: ...Ostro Pali Sie, Przemijaja Noce Przemijaja Dnie....", 
	"tit1": "NAvoie", "tit2": "Bohema", "tit3": "Baska", "tit4": "Pijemy Za Lepszy Czas", "answ": "Bohema" },

{ "lp": "", "words": "Goldfish: ...Cant You See What You Done...", 
	"tit1": "Washing Over Me", "tit2": "Devil Woman", "tit3": "Hold Tight", "tit4": "Suitcase", "answ": "Washing Over Me" },

{ "lp": "", "words": "Happysad: ...Ostatni Raz Widzialem Cie, Zaraz Przypomne Sobie Gdzie...", 
	"tit1": "Wpusc Mnie", "tit2": "Dluga Droga W Dol", "tit3": "Kostuchna", "tit4": "Wszystko Jedno", "answ": "Wszystko Jedno" },

{ "lp": "", "words": "Mannam: ...Szyby Niebieskie, Od Telewizorow...", 
	"tit1": "Cyklady na Cykladach", "tit2": "Szklana Pogoda", "tit3": "Kochac Cie Jak Irlandie", "tit4": "M", "answ": "Szklana Pogoda" },

{ "lp": "", "words": "Lady Pank: ...Pelna Ulic, Placow, Drzew. Rzadko Slyszysz Tu Brawa, Czesciej To Drwiacy Smiech...", 
	"tit1": "Zawsze Tam Gdzie Ty", "tit2": "Marchewkowe Pole", "tit3": "Warszawa", "tit4": "Warszawski Deszcz", "answ": "Warszawa" },

{ "lp": "", "words": "Perfect: ...Mialem 10 Lat Gdy Uslyszal O Nim Swiat, W Mej Piwnicy Byl Nasz Klub...", 
	"tit1": "Niepokonani", "tit2": "Autobiografia", "tit3": "Kołysanka Dla Nieznajomej", "tit4": "Nie Placz Ewka", "answ": "Autobiografia" }
];*/

var mongo = require('mongodb');
var db = new mongo.Db('Users', new mongo.Server('localhost', 27017), {safe: true});
db.open(function (err) {
  if(!err){
    		console.log("We are connected");
  	  }
  else{
		console.log("We aren't connected" + err);
      }

  db.collection('music', function (err, coll) {
        coll.insert( [
			{ "lp": "1", "words": "Vavamuffin: ...Regenerrator Kocha Jah Jah, Vavamuffin Wielbi Pana...", 
			"tit1": "Wektor", "tit2": "Bless", "tit3": "Sekta", "tit4": "Paramonov", "answ": "Sekta" },

			{ "lp": "2", "words": "Republika: ...Ta Piosenka Jest, Pisana Dla Pieniedzy...", 
			"tit1": "Mamona", "tit2": "Urszula", "tit3": "Pobliskie", "tit4": "Kasa", "answ": "Mamona" },

			{ "lp": "3", "words": "Bon Jovi: ....Whooah, We Are Half Way There ", 
			"tit1": "Its My Life", "tit2": "Livin On A Prayer", "tit3": "Bad Name", "tit4": "Old School", "answ": "Livin On A Prayer" },

			{ "lp": "4", "words": "Coma: ...A Moze Ja Jestem Odpowiesc Zmeczonych Ust...", 
			"tit1": "Dziele Na Pol", "tit2": "Zly Dzien", "tit3": "Piosenka Pisana Noca", "tit4": "Rasta", "answ": "Piosenka Pisana Noca" },

			{ "lp": "5", "words": "Wilki: ...Ostro Pali Sie, Przemijaja Noce Przemijaja Dnie....", 
			"tit1": "NAvoie", "tit2": "Bohema", "tit3": "Baska", "tit4": "Pijemy Za Lepszy Czas", "answ": "Bohema" },

			{ "lp": "6", "words": "Goldfish: ...Cant You See What You Done...", 
			"tit1": "Washing Over Me", "tit2": "Devil Woman", "tit3": "Hold Tight", "tit4": "Suitcase", "answ": "Washing Over Me" },

			{ "lp": "7", "words": "Happysad: ...Ostatni Raz Widzialem Cie, Zaraz Przypomne Sobie Gdzie...", 
			"tit1": "Wpusc Mnie", "tit2": "Dluga Droga W Dol", "tit3": "Kostuchna", "tit4": "Wszystko Jedno", "answ": "Wszystko Jedno" },

			{ "lp": "8", "words": "Mannam: ...Szyby Niebieskie, Od Telewizorow...", 
			"tit1": "Cyklady na Cykladach", "tit2": "Szklana Pogoda", "tit3": "Kochac Cie Jak Irlandie", "tit4": "M", "answ": "Szklana Pogoda" },

			{ "lp": "9", "words": "Lady Pank: ...Pelna Ulic, Placow, Drzew. Rzadko Slyszysz Tu Brawa, Czesciej To Drwiacy Smiech...", 
			"tit1": "Zawsze Tam Gdzie Ty", "tit2": "Marchewkowe Pole", "tit3": "Warszawa", "tit4": "Warszawski Deszcz", "answ": "Warszawa" },

			{ "lp": "10", "words": "Perfect: ...Mialem 10 Lat Gdy Uslyszal O Nim Swiat, W Mej Piwnicy Byl Nasz Klub...", 
			"tit1": "Niepokonani", "tit2": "Autobiografia", "tit3": "Kołysanka Dla Nieznajomej", "tit4": "Nie Placz Ewka", "answ": "Autobiografia" }],function (err) {
		     		coll.find().toArray(function (err, items) {
                			console.log(items);
                			db.close();
            			});
    		   }
	);
  });

});
