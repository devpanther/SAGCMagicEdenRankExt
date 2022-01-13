const getRank = async (nftId) => {
		let res = await fetch("https://search.raritysniper.com/multi_search?x-typesense-api-key=V2R2WUh5U3hQbUZtL1lNS2lTSHlmTjh3VWdVYlZkZ0dDZzNHbVptMERFZz13WHhOeyJmaWx0ZXJfYnkiOiJwdWJsaXNoZWQ6dHJ1ZSJ9", {
      "headers": {
        "accept": "application/json, text/plain, */*",
        "accept-language": "en-US,en;q=0.9",
        "content-type": "text/plain",
      },
      "referrer": "https://raritysniper.com/",
      "referrerPolicy": "strict-origin-when-cross-origin",
      "body": `{\"searches\":[{\"sort_by\":\"rank:asc,tokenId:asc\",\"collection\":\"asset_shredded-apes-gym-club\",\"q\":\"*\",\"facet_by\":\"nftId\",\"filter_by\":\"nftId:=[${nftId}]\",\"page\":1,\"per_page\":1}]}`,
      "method": "POST",
      "mode": "cors",
      "credentials": "omit"
    });
    let data = await res.json();
    return data?.results[0]?.hits[0]?.document?.rank;
}

let count = 0;

var setLOadMoreFill = (function() {
    var executed = false;
    return function() {
        if (!executed) {
            executed = true;
            $(document).on('DOMNodeInserted', function(e) {
              if ( $(e.target).hasClass('grid-card__main') ) {
                count++
                if(count % 20 === 0){
                  readAndFill();
                }
              }
            });
        }
    };
})();

const readAndFill = () => {
	$('.grid-card__main').each(async function(i, obj) {
      let main = $('.grid-card__main').eq(i).children().eq(1).children().eq(0);
      if(main.children('div').eq(0).children('div').eq(0).children('h1').eq(0).text() === ""){
        let res = await getRank(main.children('a').eq(0).children().eq(0).text().split('#')[1])
        main.children('div').eq(0).children('div').eq(0).css({'justify-content': 'space-between', 'display': 'flex'})
        main.children('div').eq(0).children('div').eq(0).append(`<h1>Rank: ${res}`)
      }
  });
  setLOadMoreFill()
}

readAndFill();