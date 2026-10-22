// Dati reali dal menù digitale del locale (NordQR), in italiano.
export type MenuItem = { name: string; note?: string; prices: number[]; photo?: string }
export type MenuSection = { title: string; note?: string; priceLabels?: string[]; items: MenuItem[] }
export type MenuCategory = { id: string; title: string; kicker: string; sections: MenuSection[] }

export const menu: MenuCategory[] = [
  {
    "id": "pranzo",
    "title": "Pranzo",
    "kicker": "Cucina 12:30 – 14:30",
    "sections": [
      {
        "title": "I nostri piatti",
        "items": [
          {
            "name": "Lasagna al ragù con provola affumicata",
            "prices": [
              14
            ]
          },
          {
            "name": "Lasagna bianca con speck, gorgonzola, pesto di agrumi e anacardi",
            "prices": [
              14
            ]
          },
          {
            "name": "Paccheri al ragù bianco di carne profumato al cannonau",
            "prices": [
              14
            ],
            "note": "con pecorino"
          },
          {
            "name": "Trofie ai frutti di mare",
            "prices": [
              16
            ],
            "note": "con bottarga"
          },
          {
            "name": "Zuppa di legumi e cereali con guanciale e zafferano",
            "prices": [
              12
            ]
          },
          {
            "name": "Spezzatino di manzo con olive taggiasche",
            "prices": [
              14
            ]
          },
          {
            "name": "Carpaccio di manzo in emulsione di soia, limone e olio tartufato con pecorino",
            "prices": [
              16
            ],
            "note": "e pistacchi",
            "photo": "carpaccio-manzo"
          },
          {
            "name": "Insalata di polpo con rucola e nocciole",
            "prices": [
              16
            ],
            "photo": "polpo-insalata"
          },
          {
            "name": "Tartare di tonno in salsa ponzu con crema e semi di zucca",
            "prices": [
              16
            ],
            "photo": "tartare-ponzu"
          },
          {
            "name": "Rana pescatrice alla catalana",
            "prices": [
              14
            ]
          },
          {
            "name": "Riso venere con seppiette alla diavola con origano",
            "prices": [
              16
            ],
            "photo": "seppiette-riso-venere"
          },
          {
            "name": "Filetto di orata fritto con rucola, teriyaki, sesamo",
            "prices": [
              16
            ],
            "note": "e maionese al wasabi",
            "photo": "orata-fritta"
          },
          {
            "name": "Bocconcini di pollo al curry e latte di cocco",
            "prices": [
              14
            ],
            "photo": "curry-pollo"
          },
          {
            "name": "Trippa al sugo con pecorino",
            "prices": [
              14
            ]
          },
          {
            "name": "Insalata di barbabietola, lenticchie, rucola, nocciole e pecorino",
            "prices": [
              10
            ]
          },
          {
            "name": "Burrata con pomodorini e basilico",
            "prices": [
              8
            ],
            "photo": "burrata"
          },
          {
            "name": "Fagioli e ceci con crema di peperoni, peperoncino e fonduta di taleggio",
            "prices": [
              6
            ]
          },
          {
            "name": "Patate al forno",
            "prices": [
              4
            ]
          }
        ],
        "note": "Servizio operativo dalle 12:30 alle 14:30"
      }
    ]
  },
  {
    "id": "caffetteria",
    "title": "Caffetteria",
    "kicker": "Dal bancone",
    "sections": [
      {
        "title": "Caffetteria",
        "items": [
          {
            "name": "Caffè espresso",
            "prices": [
              1.3
            ]
          },
          {
            "name": "Caffè macchiato",
            "prices": [
              1.3
            ]
          },
          {
            "name": "Cappuccino",
            "prices": [
              1.6
            ]
          },
          {
            "name": "Latte macchiato",
            "prices": [
              1.7
            ]
          },
          {
            "name": "Marocchino alla nutella",
            "prices": [
              2.5
            ]
          },
          {
            "name": "Caffè decaffeinato",
            "prices": [
              1.4
            ]
          },
          {
            "name": "Orzo",
            "prices": [
              2.5
            ]
          },
          {
            "name": "Ginseng",
            "prices": [
              2
            ]
          },
          {
            "name": "Cappuccino al Ginseng",
            "prices": [
              2.5
            ]
          },
          {
            "name": "Cappuccino all'Orzo",
            "prices": [
              3
            ]
          },
          {
            "name": "The caldo Twinings",
            "prices": [
              1.8
            ]
          },
          {
            "name": "Tisana Pompadour",
            "prices": [
              1.8
            ]
          },
          {
            "name": "Cioccolata",
            "prices": [
              3,
              3.5
            ]
          },
          {
            "name": "Bicchiere d'acqua",
            "prices": [
              0.3
            ]
          },
          {
            "name": "Bottiglietta d'acqua 50cl",
            "prices": [
              1
            ]
          },
          {
            "name": "Bottiglia d'acqua 1L",
            "prices": [
              2
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "snack-dolci",
    "title": "Snack e dolci",
    "kicker": "Salato e dolce",
    "sections": [
      {
        "title": "Salato",
        "items": [
          {
            "name": "Tramezzino",
            "prices": [
              3
            ],
            "note": "Vedi gusti"
          },
          {
            "name": "Toast",
            "prices": [
              5
            ],
            "note": "Prosciutto cotto e fontina"
          },
          {
            "name": "Pizzette sfoglia",
            "prices": [
              2
            ],
            "note": "Margherita"
          }
        ]
      },
      {
        "title": "Dolce",
        "items": [
          {
            "name": "Brioches e croissants",
            "prices": [
              1.5
            ],
            "note": "Vedi gusti"
          },
          {
            "name": "Tiramisù",
            "prices": [
              4
            ],
            "note": "Savoiardi, mascarpone senza lattosio, uova e caffè"
          },
          {
            "name": "Zuppa Inglese",
            "prices": [
              4
            ],
            "note": "Come il tiramisù ma con il liquore al posto del caffè"
          },
          {
            "name": "Torta della nonna",
            "prices": [
              4
            ],
            "note": "Crema al limone e pinoli"
          },
          {
            "name": "Cheesecake alle fragole",
            "prices": [
              5
            ],
            "note": "Torta al philadelphia senza biscotto"
          },
          {
            "name": "Cheesecake al pistacchio",
            "prices": [
              5
            ],
            "note": "Torta al philadelphia con il biscotto"
          }
        ]
      }
    ]
  },
  {
    "id": "cocktail",
    "title": "Cocktail",
    "kicker": "Signature e classici",
    "sections": [
      {
        "title": "Signature drinks",
        "items": [
          {
            "name": "Bitter sunset",
            "prices": [
              7
            ],
            "note": "Gin, montenegro, limone, succo pompelmo, bitter all'arancia, angostura, crema di birra"
          },
          {
            "name": "Grapefruit Velvet",
            "prices": [
              7
            ],
            "note": "Bitter Campari, Gin, succo pompelmo, succo di limone, crema di birra"
          },
          {
            "name": "Dirty Basil Smash",
            "prices": [
              7
            ],
            "note": "Basilico, gin, limone, zucchero"
          },
          {
            "name": "Giadamarì",
            "prices": [
              7
            ],
            "note": "Liquore Italicus, liquore ai fiori di sambuco, succo d'arancia, lime, zucchero"
          },
          {
            "name": "Watermelon sugar",
            "prices": [
              7
            ],
            "note": "Vodka, liquore all'anguria, limone, succo pompelmo, sciroppo ai fiori di sambuco"
          },
          {
            "name": "Pineapple Mojito",
            "prices": [
              7
            ],
            "note": "Rum ambrato, lime, zucchero, menta, succo d'ananas"
          },
          {
            "name": "Summer Litchi",
            "prices": [
              7
            ],
            "note": "Liquore al Litchi, liquore alla banana, lime, succo banana, succo mirtillo, purea di fragola"
          }
        ]
      },
      {
        "title": "Classics",
        "items": [
          {
            "name": "Negroni",
            "prices": [
              7
            ],
            "note": "Tanqueray Gin, Vermouth Martini riserva rubino, bitter Campari"
          },
          {
            "name": "Negroni sbagliato",
            "prices": [
              7
            ],
            "note": "Vermouth, Campari, prosecco"
          },
          {
            "name": "Americano",
            "prices": [
              7
            ],
            "note": "Vermouth, Campari, soda"
          },
          {
            "name": "Daiquiri",
            "prices": [
              7
            ],
            "note": "Rum bacardi carta blanca, lime, zucchero"
          },
          {
            "name": "Mojito",
            "prices": [
              7
            ],
            "note": "Rum bianco, lime, zucchero, menta, soda"
          },
          {
            "name": "Rum cooler",
            "prices": [
              7
            ],
            "note": "Bacardi carta oro, lime, arancia, limone, zucchero, ginger ale"
          },
          {
            "name": "Cuba libre",
            "prices": [
              7
            ],
            "note": "Rum ambrato, lime, Coca Cola"
          }
        ],
        "note": "Chiedi il tuo cocktail preferito al nostro staff, se avremo disponibilità degli ingredienti necessari saremo felici di accontentarti!"
      }
    ]
  },
  {
    "id": "gin",
    "title": "Gin e distillati",
    "kicker": "Con tonica premium",
    "sections": [
      {
        "title": "Gin (con tonica premium)",
        "items": [
          {
            "name": "Etsu classico",
            "prices": [
              10
            ],
            "note": "Gin giapponese morbido, agrumato, finemente distillato. Etsu significa \"piacere\""
          },
          {
            "name": "Etsu Pacific Ocean",
            "prices": [
              12
            ],
            "note": "Aromatizzato con l'acqua del pacifico: sentori salini e che ricordano le alghe"
          },
          {
            "name": "Etsu Yuzu",
            "prices": [
              10
            ],
            "note": "Aromatizzato allo yuzu, un agrume giapponese simile al limone ma più dolce"
          },
          {
            "name": "Etsu Sakura",
            "prices": [
              10
            ],
            "note": "Gin Giapponese aromatizzato ai fiori di ciliegio, dolce e floreale"
          },
          {
            "name": "Hendricks classico",
            "prices": [
              8
            ],
            "note": "Agrumato con sentori di cetriolo, rosa e coriandolo"
          },
          {
            "name": "Hendricks Neptunia",
            "prices": [
              10
            ],
            "note": "Sentori salini e agrumati"
          },
          {
            "name": "Hendricks Orbium",
            "prices": [
              10
            ],
            "note": "Assenzio, chinino e fiori di loto blu"
          },
          {
            "name": "Hendrick's Solstizio d'Estate",
            "prices": [
              10
            ],
            "note": "Aromatizzato con i fiori presenti durante il solstizio d'estate"
          },
          {
            "name": "Hendrick's Flora Adora",
            "prices": [
              10
            ],
            "note": "Il gin floreale per eccellenza"
          },
          {
            "name": "Hendrick's Grand Cabaret",
            "prices": [
              10
            ],
            "note": "La ricetta Hendrick's con infusione di pesca e ciliegia"
          },
          {
            "name": "Gin Mare",
            "prices": [
              10
            ],
            "note": "Sentori di macchia mediterranea"
          },
          {
            "name": "Gin Mare Capri",
            "prices": [
              12
            ],
            "note": "Aromatizzato con il bergamotto e i limoni di Capri"
          },
          {
            "name": "Monkey 47",
            "prices": [
              12
            ],
            "note": "Dry gin aromatizzato con ben 47 botaniche originarie dell'Inghilterra, dell'India e della Foresta Nera"
          },
          {
            "name": "Taurus",
            "prices": [
              10
            ],
            "note": "Gin nero italiano agrumato e dissetante"
          },
          {
            "name": "Santa Ana",
            "prices": [
              10
            ],
            "note": "Il gin di Don Papa. Sentori floreali e fruttati che ricordano l'anice."
          },
          {
            "name": "Genesi",
            "prices": [
              8
            ],
            "note": "Gin distillato con bacche di ginepro e mirto raccolte in Sardegna"
          },
          {
            "name": "Gin arte",
            "prices": [
              10
            ],
            "note": "Gin italiano aromatizzato con le piante che si utilizzavano per i pigmenti dei colori ad olio: un gusto speziato e resinoso"
          },
          {
            "name": "Nordés",
            "prices": [
              9
            ],
            "note": "Aromatizzato con le botaniche della Galizia: fresco, speziato e salino"
          },
          {
            "name": "Ginepraio",
            "prices": [
              8
            ],
            "note": "Gin toscano in cui il Ginepro la fa da padrone"
          },
          {
            "name": "Mayfair",
            "prices": [
              7
            ],
            "note": "London Dry Gin con ginepro alpino, pepe e coriandolo"
          },
          {
            "name": "Roku Gin",
            "prices": [
              9
            ],
            "note": "Gin giapponese con foglie e fiori di Sakura, scorze di Yuzu e altre botaniche nipponiche"
          },
          {
            "name": "Elephant",
            "prices": [
              12
            ],
            "note": "London dry gin tedesco aromatizzato con mele, zenzero e pepe. Il 15% dei ricavi viene donato a un'associazione per la tutela degli elefanti."
          },
          {
            "name": "Gunpowder",
            "prices": [
              8
            ],
            "note": "Gin irlandese agrumato aromatizzato alle foglie di The Gunpowder"
          },
          {
            "name": "Gunpowder alla Pompia",
            "prices": [
              9
            ],
            "note": "Gin irlandese aromatizzato con the cinese e scorza di pompia sarda"
          },
          {
            "name": "Gunpowder Rosa",
            "prices": [
              10
            ],
            "note": "Aromatizzato con fico e alloro, è un gin dolce e speziato, realizzato in collaborazione con Bruno Vanzan"
          },
          {
            "name": "Roby Marton",
            "prices": [
              12
            ],
            "note": "Gin italiano speziato con liquirizia, cannella, chiodi di garofano e agrumi"
          },
          {
            "name": "Insulae Rosa",
            "prices": [
              8
            ],
            "note": "London dry gin siciliano agrumato e salino"
          },
          {
            "name": "Six Ravens",
            "prices": [
              8
            ],
            "note": "London dry gin con note di ginepro e zenzero"
          },
          {
            "name": "Tanqueray",
            "prices": [
              6
            ],
            "note": "London dry gin classico"
          },
          {
            "name": "Tanqueray Sevilla",
            "prices": [
              8
            ],
            "note": "Gin aromatizzato alle arance andaluse"
          },
          {
            "name": "L'acrobate",
            "prices": [
              10
            ],
            "note": "Gin francese profumato e agrumato, con yuzu, coriandolo, alga spirulina, zenzero e mandarino"
          },
          {
            "name": "Jinzu",
            "prices": [
              10
            ],
            "note": "Gin giapponese aromatizzato con yuzu, saké e fiori di ciliegio"
          },
          {
            "name": "Principum",
            "prices": [
              8
            ],
            "note": "Gin calabrese con bergamotto e peperoncino"
          },
          {
            "name": "Yu Gin",
            "prices": [
              8
            ],
            "note": "Gin francese aromatizzato allo Yuzu, un agrume giapponese simile al limone."
          },
          {
            "name": "Martin Millers",
            "prices": [
              7
            ],
            "note": "Gin inglese agrumato e vivace allungato con acqua delle fonti islandesi."
          },
          {
            "name": "Rena 41",
            "prices": [
              10
            ],
            "note": "Gin distillato con botaniche 100% sarde come bacche di mirto, fiori di elicriso, scorze di limone e pompelmo"
          },
          {
            "name": "N°3 Gin",
            "prices": [
              12
            ],
            "note": "London Dry Gin prodotto da una storica distilleria inglese: elegante, raffinato, equilibrato"
          },
          {
            "name": "Gin del Professore - Monsieur",
            "prices": [
              12
            ],
            "note": "Gin italiano secco e balsamico"
          },
          {
            "name": "Gin del Professore - Madame",
            "prices": [
              12
            ],
            "note": "Gin balsamico, floreale con sentori di cannella"
          },
          {
            "name": "Old Grifu",
            "prices": [
              8
            ],
            "note": "Gin da meditazione da bere liscio, senza tonica. Profumi di ginestra, timo e camomilla, buccia d'arancia, note marine, ed erbe aromatiche tipiche della macchia mediterranea"
          },
          {
            "name": "Boigin",
            "prices": [
              10
            ],
            "note": "Gin sardo prodotto da Silvio Carta. Note intense di ginepro e agrumi"
          },
          {
            "name": "Boigin Saffron",
            "prices": [
              12
            ],
            "note": "Gin sardo aromatizzato allo zafferano. Unico nel suo genere."
          },
          {
            "name": "Botanical Gin",
            "prices": [
              12
            ],
            "note": "Gin cinese aromatizzato con le botaniche che crescono vicino al fiume Liuyang. Molto speziato, non per tutti"
          },
          {
            "name": "The Botanist",
            "prices": [
              12
            ],
            "note": "Prodotto dai fratelli branca nelle isole Islay: un gin balsamico e agrumato, elegante"
          },
          {
            "name": "Pao de Sitges",
            "prices": [
              12
            ],
            "note": "Ispirato all'omonima cittadina vicino Barcellona. Un london dry gin agrumato e salino."
          },
          {
            "name": "Bulldog",
            "prices": [
              7
            ],
            "note": "London Dry Gin che non stanca mai. Botaniche orientali e occidentali si fondono perfettamente"
          },
          {
            "name": "Solo Gin",
            "prices": [
              10
            ],
            "note": "Gin sardo con ginepro, mirto e erbe della macchia mediterranea finemente bilanciate"
          },
          {
            "name": "Raasay Gin",
            "prices": [
              9
            ],
            "note": "Gin scozzese speziato e agrumato"
          },
          {
            "name": "Cubical",
            "prices": [
              7
            ],
            "note": "London dry gin delicato ed elegante, distillato tre volte"
          },
          {
            "name": "N°Ten Tanqueray",
            "prices": [
              8
            ],
            "note": "London dry gin morbido e agrumato"
          },
          {
            "name": "Gin vento",
            "prices": [
              8
            ],
            "note": "London dry gin aromatizzato con agrumi del lago di Garda"
          },
          {
            "name": "Rivo Gin",
            "prices": [
              9
            ],
            "note": "Aromatizzato con le erbe del lago di Como"
          },
          {
            "name": "Ginepraio Mediterraneo",
            "prices": [
              9
            ],
            "note": "Agrumato e vegetale"
          },
          {
            "name": "Engine",
            "prices": [
              8
            ],
            "note": "Gin italiano aromatizzato alla salvia e al limone"
          },
          {
            "name": "Scapegrace",
            "prices": [
              9
            ],
            "note": "Gin neozelandese morbido, speziato, agrumato"
          },
          {
            "name": "Crespo Gin",
            "prices": [
              10
            ],
            "note": "London dry gin prodotto nelle Ande, distillato ben 5 volte. Secco e pungente"
          },
          {
            "name": "Gin Pilz",
            "prices": [
              8
            ],
            "note": "Gin italiano aromatizzato con le erbe del Trentino. Secco e pulito"
          },
          {
            "name": "Bombay Sapphire",
            "prices": [
              7
            ],
            "note": "London dry gin aromatizzato con agrumi e pepe nero. Un classico intramontabile"
          },
          {
            "name": "Boigin",
            "prices": [
              7
            ],
            "note": "Gin sardo, secco e deciso, sentori di macchia mediterranea e agrumi"
          },
          {
            "name": "Fifty Pounds",
            "prices": [
              8
            ],
            "note": "Gin inglese secco e agrumato, distillato 4 volte"
          },
          {
            "name": "Amuerte",
            "prices": [
              12
            ],
            "note": "Gin peruviano aromatizzato con le foglie di coca, oltre ad erbe e frutti sudamericani"
          }
        ]
      },
      {
        "title": "Rum",
        "items": [
          {
            "name": "Kraken",
            "prices": [
              5
            ],
            "note": "Rum di melassa prodotto in Trinidad & Tobago aromatizzato con cannella, vaniglia, caffè e invecchiato in botti di rovere. Dolce e speziato"
          },
          {
            "name": "Demon's Share 6",
            "prices": [
              6
            ],
            "note": "Rum di canna da zucchero prodotto a Panama invecchiato almeno 6 anni. Dolce con sentori di vaniglia, legno, cuoio e agrumi. Il nome si riferisce alla percentuale di distillato che inevitabilmente evapora e che viene definita \"la parte dei demoni\""
          },
          {
            "name": "Don Papa Classico 7 anni",
            "prices": [
              8
            ],
            "note": "Rum delle Filippine chiamato così in onore di Papa Isio, eroe della rivoluzione filippina. Melassa di prima qualità per un rum dolce e speziato."
          },
          {
            "name": "Don papa Baroko",
            "prices": [
              5
            ],
            "note": "Rum di melassa aromatizzato alla Vaniglia. Baroko significa \"esuberante\""
          },
          {
            "name": "Don Papa Masskara",
            "prices": [
              6
            ],
            "note": "Rum di melassa aromatizzato al Calamansi, un agrume tipico delle Filippine. Masskara significa \"molte facce\" e si riferisce alla celebrazione più importante dell'arcipelago, simile al nostro Carnevale"
          },
          {
            "name": "Don Papa Gayuma",
            "prices": [
              7
            ],
            "note": "Un rum dolciastro invecchiato in botti ex-bourbon ed ex-Islay whisky. Gayuma significa \"pozione d'amore\""
          },
          {
            "name": "Don Papa Sherry",
            "prices": [
              9
            ],
            "note": "Rum di melassa invecchiato in botti di Sherry, sentori di prugne e datteri"
          },
          {
            "name": "Don Papa Rye Aged",
            "prices": [
              10
            ],
            "note": "Rum di melassa invecchiato in botti ex Rye Whisky. Sentori di affumicato"
          },
          {
            "name": "Matusalem 15",
            "prices": [
              7
            ],
            "note": "Rum invecchiato 15 anni con metodo solera, morbido con sentori di vaniglia, spezie e frutta esotica"
          },
          {
            "name": "Angostura 7 anni",
            "prices": [
              6
            ],
            "note": "Rum Venezuelano invecchiato almeno 7 anni in botti ex-bourbon con sentori di tostatura, caffè e acacia."
          },
          {
            "name": "Diplomatico Mantuano",
            "prices": [
              6
            ],
            "note": "Rum venezuelano agricolo dal gusto deciso, invecchiato fino ad 8 anni in botti ex-bourbon. Caramello, frutta secca e vaniglia"
          },
          {
            "name": "Diplomatico Reserva",
            "prices": [
              8
            ],
            "note": "Rum venezuelano invecchiato fino a 12 anni. Sentori di caramello, frutta secca, cioccolato e vaniglia"
          },
          {
            "name": "Botran 18 anni",
            "prices": [
              8
            ],
            "note": "Rum del Guatemala prodotto con metodo Solera. Sentori di cioccolato fondente, vaniglia e frutta secca"
          },
          {
            "name": "Dictador 20 anni",
            "prices": [
              10
            ],
            "note": "Rum di canna da zucchero colombiano invecchiato vent'anni, dolce, ricco, con sentori di liquirizia, caramello e caffè"
          },
          {
            "name": "Dictador 12 anni",
            "prices": [
              8
            ],
            "note": "Rum venezuelano invecchiato 12 anni, sentori di miele, caramello e caffè"
          },
          {
            "name": "Santa Teresa 1796",
            "prices": [
              7
            ],
            "note": "Rum di melassa venezuelano prodotto con metodo Solera, finemente distillato: il gusto è raffinato con sentori di legno, tabacco, cuoio e spezie"
          },
          {
            "name": "Naga",
            "prices": [
              6
            ],
            "note": "Rum di melassa indonesiano prodotto nell'isola di Java. Gusto speziato, salino, con ricordi di mango e caramello. I naga nella cultura buddhista sono delle figure mitologiche in grado di assumere la forma dei serpenti, i quali hanno lo scopo di proteggere gli uomini dalla malvagità del mondo"
          }
        ]
      },
      {
        "title": "Whisky",
        "items": [
          {
            "name": "Bulleit",
            "prices": [
              6
            ],
            "note": "Kentucky straight bourbon. Sentori di quercia, noce moscata, sciroppo d'acero."
          },
          {
            "name": "Laphroaig 10",
            "prices": [
              8
            ],
            "note": "Islay whisky. Torbato e salmastro"
          },
          {
            "name": "Aberfeldy 12",
            "prices": [
              7
            ],
            "note": "Whisky delle Midlands. Sentori di miele, tabacco e vaniglia"
          },
          {
            "name": "Nikka from the Barrel",
            "prices": [
              10
            ],
            "note": "Whisky giapponese con una gradazione alcolica del 51,4%. Distillazione impeccabile. Sentori di spezie, caramello, legno"
          },
          {
            "name": "Tokinoka",
            "prices": [
              7
            ],
            "note": "Whisky giapponese. Tokinoka significa \"profumo del tempo\" ed è il nome della prima distilleria nipponica mai esistita. Sentori di frutta secca e albicocca."
          },
          {
            "name": "The Tottori Black",
            "prices": [
              7
            ],
            "note": "Blended whisky giapponese invecchiato in botti ex-bourbon. Sentori di vaniglia e caramello"
          },
          {
            "name": "The Tottori Red",
            "prices": [
              6
            ],
            "note": "Blended Whisky invecchiato in botti di quercia nuove. Gusto floreale, di vaniglia e cioccolato."
          },
          {
            "name": "Fujimi",
            "prices": [
              8
            ],
            "note": "Blended japanese whisky dedicato alle 7 virtù dei Samurai. Sentori di banana, vaniglia e cannella"
          },
          {
            "name": "Talisker Skye",
            "prices": [
              7
            ],
            "note": "Scotch prodotto nell'isola di Skye. Torbato, fresco e speziato"
          },
          {
            "name": "Lagavulin 8",
            "prices": [
              9
            ],
            "note": "Islay whisky torbato, marino e con sentori di cioccolato."
          },
          {
            "name": "Caol Ila 12 years",
            "prices": [
              8
            ],
            "note": "Islay whisky torbato, marino e floreale"
          },
          {
            "name": "Oban 14",
            "prices": [
              8
            ],
            "note": "Highlands Single Malt Scotch Whisky. Gusto pieno, torbato, marino con note di malto e di legno."
          }
        ]
      },
      {
        "title": "Tequila e Mezcal",
        "items": [
          {
            "name": "Tequila Espolón",
            "prices": [
              4
            ],
            "note": "100% agave blu finemente distillata per una tequila morbida, floreale e agrumata."
          },
          {
            "name": "Mezcal La Escondida",
            "prices": [
              8
            ],
            "note": "Agave espadín lavorata artigianalmente per la produzione di un mezcal di alta qualità, dal gusto affumicato, agrumato ed erbaceo"
          },
          {
            "name": "Tequila Tiscaz",
            "prices": [
              4
            ],
            "note": "Tequila da solo agave blu floreale ed erbacea"
          }
        ]
      }
    ]
  },
  {
    "id": "vini",
    "title": "Vini",
    "kicker": "Calice o bottiglia",
    "sections": [
      {
        "title": "Rossi dalla Sardegna",
        "items": [
          {
            "name": "Carda nera",
            "prices": [
              4,
              20
            ],
            "note": "Carignano del Sulcis Argiolas - Serdiana"
          },
          {
            "name": "Buio",
            "prices": [
              4,
              25
            ],
            "note": "Carignano del Sulcis Mesa - Sant'Anna Arresi"
          },
          {
            "name": "Brama",
            "prices": [
              4.5,
              25
            ],
            "note": "Syrah Mesa - Sant'Anna Arresi"
          },
          {
            "name": "Suditerra",
            "prices": [
              4,
              20
            ],
            "note": "Bovale Su 'Entu - Sanluri"
          },
          {
            "name": "Cagnulari",
            "prices": [
              4,
              20
            ],
            "note": "Cagnulari Santa Maria La Palma - Alghero"
          },
          {
            "name": "Medeus",
            "prices": [
              3.5,
              18
            ],
            "note": "Cannonau Sella & Mosca - Alghero"
          },
          {
            "name": "Locoe",
            "prices": [
              4,
              20
            ],
            "note": "Cannonau C. Orgosolo - Orgosolo"
          },
          {
            "name": "Sartiu",
            "prices": [
              4,
              20
            ],
            "note": "Cannonau Giuseppe Sedilesu - Mamoiada"
          },
          {
            "name": "Mertzeoro",
            "prices": [
              4,
              22
            ],
            "note": "Cannonau Mertzeoro - Mamoiada"
          },
          {
            "name": "Thurcalesu",
            "prices": [
              4,
              22
            ],
            "note": "Cannonau Dorgali - Berritta"
          },
          {
            "name": "Zispanu",
            "prices": [
              40
            ],
            "note": "G. Sedilesu - Mamoiada"
          },
          {
            "name": "Carnevale",
            "prices": [
              45
            ],
            "note": "G. Sedilesu - Mamoiada"
          },
          {
            "name": "Korem",
            "prices": [
              45
            ],
            "note": "Bovale Argiolas - Serdiana"
          }
        ],
        "priceLabels": [
          "Calice",
          "Bottiglia"
        ]
      },
      {
        "title": "Rossi Nazionali",
        "items": [
          {
            "name": "Apassimento",
            "prices": [
              4,
              20
            ],
            "note": "Corvina, Corvinone, Rondinella Domini Veneti - Veneto"
          },
          {
            "name": "Villa Antinori",
            "prices": [
              4,
              20
            ],
            "note": "Sangiovese, Cabernet Sauvignon, Merlot, Syrah Antinori - Toscana"
          },
          {
            "name": "Achelo",
            "prices": [
              4,
              20
            ],
            "note": "Syrah Antinori - Toscana"
          },
          {
            "name": "Nebbiolo",
            "prices": [
              4,
              22
            ],
            "note": "Nebbiolo Damilano - Piemonte"
          },
          {
            "name": "Botrosecco",
            "prices": [
              4,
              22
            ],
            "note": "Cabernet Sauvignon, Cabernet Franc Antinori - Toscana"
          },
          {
            "name": "Peppoli",
            "prices": [
              4,
              22
            ],
            "note": "Chianti (Sangiovese) Antinori - Toscana"
          },
          {
            "name": "Appia Antica",
            "prices": [
              4,
              22
            ],
            "note": "Cabernet Franc, Cabernet Sauvignon, Merlot Antinori Principe Alberico - Lazio"
          },
          {
            "name": "Bruciato",
            "prices": [
              35
            ],
            "note": "Cabernet Sauvignon, Merlot, Cabernet Franc, Syrah, Petit Verdot Antinori - Toscana"
          }
        ],
        "priceLabels": [
          "Calice",
          "Bottiglia"
        ]
      },
      {
        "title": "Bianchi dalla Sardegna",
        "items": [
          {
            "name": "Spera",
            "prices": [
              4,
              22
            ],
            "note": "Vermentino di Gallura Siddura - Luogosanto"
          },
          {
            "name": "Branu",
            "prices": [
              4,
              20
            ],
            "note": "Vermentino di Gallura Surrau - Arzachena"
          },
          {
            "name": "Kintari",
            "prices": [
              4
            ],
            "note": "Vermentino Gallura - S'Araja"
          },
          {
            "name": "Filine",
            "prices": [
              3.5,
              18
            ],
            "note": "Vermentino Cantina Dorgali"
          },
          {
            "name": "Indolente",
            "prices": [
              4
            ],
            "note": "Vermentino - Tenute Asinara"
          },
          {
            "name": "Cala Reale",
            "prices": [
              4,
              20
            ],
            "note": "Vermentino Sella & Mosca - Alghero"
          },
          {
            "name": "Catore",
            "prices": [
              4,
              22
            ],
            "note": "Torbato Sella & Mosca - Alghero"
          },
          {
            "name": "Iselis Bianco",
            "prices": [
              4
            ],
            "note": "Nasco - Argiolas"
          },
          {
            "name": "Mertzeoro",
            "prices": [
              4
            ],
            "note": "Granatza - Mamoiada"
          },
          {
            "name": "Parallelo 41",
            "prices": [
              4
            ],
            "note": "Torbato e Sauvignon - Sella e Mosca"
          },
          {
            "name": "Pedraia",
            "prices": [
              4
            ],
            "note": "Nuragus - Santadi"
          }
        ],
        "priceLabels": [
          "Calice",
          "Bottiglia"
        ]
      },
      {
        "title": "Bianchi nazionali",
        "items": [
          {
            "name": "Gewürztraminer",
            "prices": [
              4,
              20
            ]
          },
          {
            "name": "Sauvignon",
            "prices": [
              4,
              22
            ]
          },
          {
            "name": "Pinot Grigio",
            "prices": [
              4,
              22
            ]
          },
          {
            "name": "Ribolla Gialla",
            "prices": [
              4,
              22
            ]
          }
        ],
        "priceLabels": [
          "Calice",
          "Bottiglia"
        ]
      },
      {
        "title": "Bollicine",
        "items": [
          {
            "name": "Prosecco",
            "prices": [
              3.5,
              18
            ],
            "note": "Glera Montelvini - Veneto"
          },
          {
            "name": "Akenta Spumante",
            "prices": [
              4,
              20
            ],
            "note": "Vermentino Santa Maria La Palma - Alghero"
          },
          {
            "name": "Akenta Cagnulari Rosé",
            "prices": [
              4,
              20
            ],
            "note": "Cagnulari Santa Maria La Palma - Alghero"
          },
          {
            "name": "Oscarì",
            "prices": [
              4.5,
              25
            ],
            "note": "Torbato Metodo Classico Sella & Mosca - Alghero"
          },
          {
            "name": "Franciacorta Saten",
            "prices": [
              6,
              30
            ],
            "note": "Chardonnay Contadi Castaldi - Lombardia"
          },
          {
            "name": "Ca' del Bosco - Cuvee Prestige",
            "prices": [
              35
            ],
            "note": "Chardonnay, Pinot Nero, Pinot Bianco"
          }
        ],
        "priceLabels": [
          "Calice",
          "Bottiglia"
        ]
      },
      {
        "title": "Rosati",
        "items": [
          {
            "name": "Anemone",
            "prices": [
              4,
              22
            ],
            "note": "Cannonau, Sangiovese Sella & Mosca - Alghero"
          }
        ],
        "priceLabels": [
          "Calice",
          "Bottiglia"
        ]
      }
    ]
  },
  {
    "id": "birre",
    "title": "Birre",
    "kicker": "Spina, artigianali, bottiglia",
    "sections": [
      {
        "title": "Alla spina",
        "items": [
          {
            "name": "Nastro Azzurro",
            "prices": [
              2,
              3,
              4
            ],
            "note": "Pilsner - Italia"
          },
          {
            "name": "Pilsner Urquell",
            "prices": [
              2.5,
              3.5,
              4.5
            ],
            "note": "Pilsner - Repubblica Ceca"
          }
        ],
        "priceLabels": [
          "Piccola",
          "Media",
          "Grande"
        ]
      },
      {
        "title": "Artigianali",
        "items": [
          {
            "name": "Zemyna Aukso 50cl",
            "prices": [
              7
            ],
            "note": "Golden Ale, bionda e leggera"
          },
          {
            "name": "Zemyna Sweyn 50cl",
            "prices": [
              7
            ],
            "note": "English Ipa: ambrata e piacevolmente amara"
          },
          {
            "name": "Zemyna Flamma 50cl",
            "prices": [
              7
            ],
            "note": "Session Ipa: dorata e agrumata"
          }
        ],
        "note": "Birrificio di Nuoro. Zemyna"
      },
      {
        "title": "Birre speciali",
        "items": [
          {
            "name": "Hoegaarden",
            "prices": [
              4
            ],
            "note": "Birra bianca belga, leggera e agrumata"
          },
          {
            "name": "Session Ipa",
            "prices": [
              4
            ]
          },
          {
            "name": "Lisa",
            "prices": [
              4
            ],
            "note": "Lager italiana non filtrata"
          }
        ]
      },
      {
        "title": "Bottigliette e lattine",
        "items": [
          {
            "name": "Heineken Imported 33cl",
            "prices": [
              3.5
            ],
            "note": "Lager - Olanda"
          },
          {
            "name": "Stella Artois 33cl",
            "prices": [
              3.5
            ],
            "note": "Lager - Belgio"
          },
          {
            "name": "Beck's 33cl",
            "prices": [
              3.5
            ],
            "note": "Pilsner - Germania"
          },
          {
            "name": "Nastro Azzurro 25cl",
            "prices": [
              2.5
            ],
            "note": "Pilsner - Italia"
          },
          {
            "name": "Guinness 33cl",
            "prices": [
              4
            ],
            "note": "Stout - Irlanda"
          },
          {
            "name": "Coronita 21cl",
            "prices": [
              2.5
            ],
            "note": "Lager - Messico"
          },
          {
            "name": "Peroni senza glutine",
            "prices": [
              3.5
            ]
          }
        ]
      },
      {
        "title": "Birre analcoliche",
        "items": [
          {
            "name": "Beck's 0",
            "prices": [
              3.5
            ],
            "note": "Pilsner analcolica - Germania"
          },
          {
            "name": "Corona Cero",
            "prices": [
              3.5
            ],
            "note": "Lager analcolica - Messico"
          }
        ]
      }
    ]
  },
  {
    "id": "liquori",
    "title": "Liquori e amari",
    "kicker": "Fine pasto",
    "sections": [
      {
        "title": "Liquori e bitter",
        "items": [
          {
            "name": "Limoncello",
            "prices": [
              3
            ],
            "note": "Benalonga"
          },
          {
            "name": "Mirto",
            "prices": [
              3
            ],
            "note": "Benalonga"
          },
          {
            "name": "Liquirizia",
            "prices": [
              3
            ],
            "note": "Benalonga"
          },
          {
            "name": "Montenegro",
            "prices": [
              3
            ]
          },
          {
            "name": "Cynar",
            "prices": [
              3
            ]
          },
          {
            "name": "Fernet Branca",
            "prices": [
              3
            ]
          },
          {
            "name": "Branca menta",
            "prices": [
              3
            ]
          },
          {
            "name": "Amaro del Capo",
            "prices": [
              3
            ]
          },
          {
            "name": "Jagermeister",
            "prices": [
              3
            ]
          },
          {
            "name": "Averna",
            "prices": [
              3
            ]
          },
          {
            "name": "Ramazzotti",
            "prices": [
              3
            ]
          },
          {
            "name": "Bailey's",
            "prices": [
              3
            ]
          },
          {
            "name": "Crema di Limone",
            "prices": [
              3
            ]
          },
          {
            "name": "Crema di Melone",
            "prices": [
              3
            ]
          },
          {
            "name": "Crema di Mirto",
            "prices": [
              3
            ]
          },
          {
            "name": "Crema di Liquirizia",
            "prices": [
              3
            ]
          },
          {
            "name": "Frangelico",
            "prices": [
              3
            ]
          },
          {
            "name": "Disaronno",
            "prices": [
              3.5
            ]
          },
          {
            "name": "Sambuca",
            "prices": [
              3
            ]
          },
          {
            "name": "Bomba Carta",
            "prices": [
              4
            ]
          },
          {
            "name": "Rabarbaro Zucca",
            "prices": [
              3
            ]
          },
          {
            "name": "Finocchietto",
            "prices": [
              3
            ]
          },
          {
            "name": "Braulio",
            "prices": [
              3
            ]
          },
          {
            "name": "Unicum",
            "prices": [
              3
            ]
          },
          {
            "name": "Petrus",
            "prices": [
              3
            ]
          },
          {
            "name": "Amaro Sibona",
            "prices": [
              3
            ]
          },
          {
            "name": "Amaro Jefferson",
            "prices": [
              3
            ]
          },
          {
            "name": "Select",
            "prices": [
              3
            ],
            "note": "Bitter veneziano"
          },
          {
            "name": "Aperol Barbieri",
            "prices": [
              3
            ],
            "note": "Con soda"
          },
          {
            "name": "Bitter Campari",
            "prices": [
              3
            ]
          },
          {
            "name": "St. Germain",
            "prices": [
              6
            ]
          },
          {
            "name": "Liquore ai fiori di sambuco",
            "prices": [
              3
            ]
          },
          {
            "name": "Italicus",
            "prices": [
              5
            ],
            "note": "Liquore al bergamotto"
          }
        ]
      },
      {
        "title": "Grappe",
        "items": [
          {
            "name": "Grappa bianca",
            "prices": [
              3
            ],
            "note": "Tremontis"
          },
          {
            "name": "Grappa barricata 903",
            "prices": [
              4
            ]
          },
          {
            "name": "Grappa Barricata 18 Lune",
            "prices": [
              5
            ]
          }
        ]
      }
    ]
  },
  {
    "id": "bibite",
    "title": "Bibite e analcolici",
    "kicker": "Per tutti",
    "sections": [
      {
        "title": "Bibite",
        "items": [
          {
            "name": "Coca cola",
            "prices": [
              2.5
            ]
          },
          {
            "name": "Coca zero",
            "prices": [
              2.5
            ]
          },
          {
            "name": "Fanta",
            "prices": [
              2.5
            ]
          },
          {
            "name": "Sprite",
            "prices": [
              2.5
            ]
          },
          {
            "name": "Redbull",
            "prices": [
              2.5
            ]
          },
          {
            "name": "Lipton pesca",
            "prices": [
              2.5
            ]
          },
          {
            "name": "Lipton limone",
            "prices": [
              2.5
            ]
          },
          {
            "name": "Estathe alla pesca",
            "prices": [
              2
            ]
          },
          {
            "name": "Estathe al limone",
            "prices": [
              2
            ]
          },
          {
            "name": "Cedrata",
            "prices": [
              2.5
            ]
          },
          {
            "name": "Chinotto",
            "prices": [
              2.5
            ]
          },
          {
            "name": "Ginger ale",
            "prices": [
              2.5
            ]
          },
          {
            "name": "Ginger beer",
            "prices": [
              2.5
            ]
          },
          {
            "name": "Succo pesca",
            "prices": [
              2.5
            ]
          },
          {
            "name": "Succo pera",
            "prices": [
              2.5
            ]
          },
          {
            "name": "Succo ace",
            "prices": [
              2.5
            ]
          },
          {
            "name": "Succo ananas",
            "prices": [
              2.5
            ]
          },
          {
            "name": "Succo pompelmo",
            "prices": [
              2.5
            ]
          },
          {
            "name": "Succo mela verde",
            "prices": [
              2.5
            ]
          },
          {
            "name": "Succo pesca mango",
            "prices": [
              2.5
            ]
          },
          {
            "name": "Succo mirtillo",
            "prices": [
              3
            ]
          },
          {
            "name": "Succo pomodoro (condito)",
            "prices": [
              3
            ]
          }
        ]
      },
      {
        "title": "Aperitivi analcolici",
        "items": [
          {
            "name": "Tonica Schweppes",
            "prices": [
              2.5
            ]
          },
          {
            "name": "Cocktail San Pellegrino",
            "prices": [
              2.5
            ]
          },
          {
            "name": "Crodino",
            "prices": [
              2.5
            ]
          },
          {
            "name": "Crodino twist",
            "prices": [
              3
            ]
          },
          {
            "name": "Tonica ai fiori di sambuco",
            "prices": [
              3
            ]
          },
          {
            "name": "Cocktail analcolico alla frutta",
            "prices": [
              5
            ]
          },
          {
            "name": "Campari soda (alcolico)",
            "prices": [
              3
            ]
          },
          {
            "name": "Aperol soda (leggermente alcolico)",
            "prices": [
              3
            ]
          }
        ]
      }
    ]
  }
]
