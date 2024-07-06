import React,{useEffect,useState} from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import Proptypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";


const News=(props)=> {
  var [articles, setArticles] = useState([]); //initial state
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  articles = [
    {
      source: {
        id: null,
        name: "The Athletic",
      },
      author: "Ken Rosenthal and Andy McCullough",
      title:
        "The unanswered questions around the Shohei Ohtani, Ippei Mizuhara betting scandal - The Athletic",
      description:
        "Why isn’t MLB investigating? What are the wider implications for MLB and other leagues? What kind of discipline might be imposed?",
      url: "https://theathletic.com/5361168/2024/03/22/shohei-ohtani-ippei-mizuhara-betting-scandal-questions/",
      urlToImage:
        "https://cdn.theathletic.com/app/uploads/2024/03/22101444/GettyImages-2043639326.jpg",
      publishedAt: "2024-03-22T14:17:56Z",
      content:
        "As the gambling scandal surrounding his friend and interpreter swirled around baseball on Thursday, Los Angeles Dodgers star Shohei Ohtani stayed silent. He exited Gocheok Sky Dome in Seoul, South Ko… [+10442 chars]",
    },
    {
      source: {
        id: "the-washington-post",
        name: "The Washington Post",
      },
      author: "Siobhán O'Grady, Kostiantyn Khudov",
      title:
        "Russia hits energy targets in Ukraine, showing need for more air defenses - The Washington Post",
      description:
        "Russian missile and drone attacks killed several people and cut electricity and water service in some areas, highlighting the vulnerability of Ukrainian cities.",
      url: "https://www.washingtonpost.com/world/2024/03/22/russia-airstrikes-energy-targets-ukraine/",
      urlToImage:
        "https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/XIDBRO2OJWCM474LKE647DHLCM.JPG&w=1440",
      publishedAt: "2024-03-22T14:10:00Z",
      content:
        "KYIV Russia launched a massive missile and drone attack on Ukrainian cities early Friday that destroyed energy infrastructure, caused power blackouts in different regions and killed several people hi… [+3192 chars]",
    },
    {
      source: {
        id: "ign",
        name: "IGN",
      },
      author: "Adele Ankers-Range",
      title:
        "World's First Dragon Ball Theme Park to Open in Saudi Arabia - IGN",
      description:
        "The world's first theme park dedicated to the Dragon Ball universe of comics, movies, and games will be built in Saudi Arabia, allowing visitors to live out the adventures of Goku and his friends.",
      url: "https://www.ign.com/articles/worlds-first-dragon-ball-theme-park-saudi-arabia",
      urlToImage:
        "https://assets-prd.ignimgs.com/2024/03/22/dragon-ball-theme-park-1711107669618.jpeg?width=1280",
      publishedAt: "2024-03-22T13:55:07Z",
      content:
        "The world's first theme park dedicated to the Dragon Ball universe of comics, movies, and games will be built in Saudi Arabia, allowing visitors to live out the adventures of Goku and his friends.\r\nT… [+1558 chars]",
    },
    {
      source: {
        id: "associated-press",
        name: "Associated Press",
      },
      author: "EDITH M. LEDERER",
      title:
        "Israel-Hamas war: Russia, China veto US cease-fire resolution - The Associated Press",
      description:
        "Russia and China have vetoed a U.S.-sponsored U.N. resolution calling for “an immediate and sustained cease-fire” in the Israel-Hamas war in Gaza to protect civilians and enable humanitarian aid to be delivered to more than 2 million hungry Palestinians. The …",
      url: "https://apnews.com/article/united-nations-us-vote-gaza-ceasefire-resolution-f6453803b3eacc9fbaa2ce5a025e2a94",
      urlToImage:
        "https://dims.apnews.com/dims4/default/cd57967/2147483647/strip/true/crop/6400x3600+0+334/resize/1440x810!/quality/90/?url=https%3A%2F%2Fassets.apnews.com%2F41%2F90%2F7d5441b2eeb330771576a4127e97%2F038b921e5f2e48e8b8cfbbc5e35a8293",
      publishedAt: "2024-03-22T13:45:00Z",
      content:
        "UNITED NATIONS (AP) Russia and China on Friday vetoed a U.S.-sponsored U.N. resolution calling for an immediate and sustained cease-fire in the Israel-Hamas war in Gaza to protect civilians and enabl… [+5315 chars]",
    },
    {
      source: {
        id: null,
        name: "Yahoo Entertainment",
      },
      author: "Subrat Patnaik",
      title:
        "Cathie Wood's Ark Takes Tiny Bite of Reddit During Trading Debut - Yahoo Finance",
      description:
        "(Bloomberg) -- Count Cathie Wood as a Reddit Inc. investor.Most Read from BloombergNY Gears Up to Seize Trump Westchester Assets If Fraud Fine Is...",
      url: "https://finance.yahoo.com/news/cathie-wood-ark-takes-tiny-124545561.html",
      urlToImage:
        "https://media.zenfs.com/en/bloomberg_markets_842/28a670194529856e3f68326f1698a8f2",
      publishedAt: "2024-03-22T13:40:44Z",
      content:
        "(Bloomberg) -- Count Cathie Wood as a Reddit Inc. investor.\r\nMost Read from Bloomberg\r\nWoods Ark Investment Management took small positions in the social media platform as it rallied 48% in its marke… [+886 chars]",
    },
    {
      source: {
        id: null,
        name: "WSMV Nashville",
      },
      author: "Daniel Smithson",
      title: "Body found in Cumberland River - WSMV 4",
      description:
        "Multiple police officers and fire personnel were dispatched to 61st Avenue North in the Nations.",
      url: "https://www.wsmv.com/2024/03/22/body-found-cumberland-river/",
      urlToImage:
        "https://gray-wsmv-prod.cdn.arcpublishing.com/resizer/v2/IZ7ZYKT6SFEA3CSHYDKL6GUV6Q.jpg?auth=850c9d72ea4bbdd2805c82519dc65111fccdd71f7c428f472f9b0bc348d313a0&width=1200&height=600&smart=true",
      publishedAt: "2024-03-22T13:33:00Z",
      content:
        "NASHVILLE, Tenn. (WSMV) BREAKING UPDATE: The body of Riley Strain has been found in the Cumberland River. \r\nPREVIOUS: Metro Nashville police and fire crews are responding to a reported drowning on th… [+720 chars]",
    },
    {
      source: {
        id: null,
        name: "CNBC",
      },
      author: "Dan Mangan",
      title:
        "Trump social media company will go public as DWAC shareholders approve merger - CNBC",
      description:
        "Donald Trump faces a looming $454 million fraud judgment in New York that state Attorney General Letitita James could start collecting on next week.",
      url: "https://www.cnbc.com/2024/03/22/trump-could-net-3-billion-from-dwac-social-media-merger-vote.html",
      urlToImage:
        "https://image.cnbcfm.com/api/v1/image/107147359-1667845863095-gettyimages-1238670001-AFP_323M3YN.jpeg?v=1691703489&w=1920&h=1080",
      publishedAt: "2024-03-22T13:32:30Z",
      content:
        "Shareholders in Digital World Acquisition Corporation voted Friday to approve a merger with Donald Trump's social media company, a deal that could net the former president an eventual windfall of $3 … [+2475 chars]",
    },
    {
      source: {
        id: null,
        name: "NDTV News",
      },
      author: null,
      title:
        "Earliest Building Blocks Of Milky Way Galaxy Named Shakti, Shiva By Scientists - NDTV",
      description:
        "NDTV.com: India, Business, Bollywood, Cricket, Video and Breaking News",
      url: "https://www.ndtv.com",
      urlToImage: "https://cdn.ndtv.com/common/images/ogndtv.png",
      publishedAt: "2024-03-22T13:29:12Z",
      content: null,
    },
    {
      source: {
        id: "abc-news",
        name: "ABC News",
      },
      author: "The Associated Press",
      title:
        "Stellantis recalls nearly 318,000 cars to replace side air bags that can explode and hurl shrapnel - ABC News",
      description:
        "Stellantis is recalling nearly 318,000 Dodge and Chrysler sedans worldwide because the side air bag inflators can explode with too much force and hurl metal fragments at drivers and passengers",
      url: "https://abcnews.go.com/US/wireStory/stellantis-recalls-285000-cars-replace-side-air-bags-108386906",
      urlToImage:
        "https://i.abcnewsfe.com/a/d1ea2207-88c0-4a16-ad33-d4f8e6aa26fd/wirestory_890aa14d1932f1581a8b425c11ed35dd_16x9.jpg?w=1600",
      publishedAt: "2024-03-22T13:11:28Z",
      content:
        "DETROIT -- Stellantis is recalling nearly 318,000 Dodge and Chrysler sedans worldwide because the side air bag inflators can explode with too much force and hurl metal fragments at drivers and passen… [+2028 chars]",
    },
    {
      source: {
        id: null,
        name: "Yahoo Entertainment",
      },
      author: "Jeff Eisenberg",
      title:
        "John Calipari's Kentucky tourney flops continue as calls for his job get louder - Yahoo Sports",
      description:
        "Oakland added to Kentucky's March misery on Thursday night, ratcheting up the pressure on Calipari entering the offseason.",
      url: "https://sports.yahoo.com/john-caliparis-kentucky-tourney-flops-continue-as-calls-for-his-job-get-louder-035647983.html",
      urlToImage:
        "https://s.yimg.com/ny/api/res/1.2/jZAVqovx5upm9Pw8d9Up0g--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD04MDA-/https://s.yimg.com/os/creatr-uploaded-images/2024-03/f2d64730-e7ff-11ee-9d7f-9af310c84597",
      publishedAt: "2024-03-22T12:57:49Z",
      content:
        "Forty-eight mens college basketball teams have won at least two NCAA tournament games in the past four seasons.\r\nThe sports most deep-pocketed blue blood, against all odds, isnt one of them.\r\nEight-t… [+6765 chars]",
    },
    {
      source: {
        id: "the-washington-post",
        name: "The Washington Post",
      },
      author: "Matthew Cappucci",
      title:
        "Scientists create stunning models of how sun will look during eclipse - The Washington Post",
      description:
        "Predictive Science has released a model of how the sun’s outer atmosphere — or corona — may look on April 8, and it’s spectacular.",
      url: "https://www.washingtonpost.com/weather/2024/03/22/solar-corona-total-eclipse-sun/",
      urlToImage:
        "https://www.washingtonpost.com/wp-apps/imrs.php?src=https://arc-anglerfish-washpost-prod-washpost.s3.amazonaws.com/public/4WIUW5HL6JAXBB5EUDOTANRFGQ.jpg&w=1440",
      publishedAt: "2024-03-22T12:07:46Z",
      content:
        "When the moon blocks the sun and day turns to night on April 8, the sky will take on an otherworldly appearance for those in the path of totality the roughly 115-mile-wide swath from Texas to Maine. … [+4791 chars]",
    },
    {
      source: {
        id: "business-insider",
        name: "Business Insider",
      },
      author: "Kim Schewitz",
      title:
        "Colon cancer doctor shares 3 things he does to prevent the disease - Business Insider",
      description:
        "Lifestyle choices can help prevent colon cancer. Oncologist Dr. Michael Shusterman shared three things he does to lower his risk.",
      url: "https://www.businessinsider.com/colon-cancer-doctor-prevention-risk-oncologist-2024-3",
      urlToImage:
        "https://i.insider.com/65fc65092417f97b87ce1e8f?width=1200&format=jpeg",
      publishedAt: "2024-03-22T11:59:00Z",
      content:
        "Colon cancer is now the leading cause of cancer death in US men under 50 and the second deadliest cancer for women of the same age.\r\nRates of the disease have been rising in younger people since the … [+3729 chars]",
    },
    {
      source: {
        id: "cbs-news",
        name: "CBS News",
      },
      author: null,
      title:
        "Former gaming executive sentenced to death in poisoning of billionaire Netflix producer in China - CBS News",
      description:
        "Xu Yao poisoned the food of company founder Lin Qi in 2020 because of a dispute over the running of the business, the court said.",
      url: "https://www.cbsnews.com/news/xu-yao-death-sentence-poisoning-netflix-producer-xu-yao-china/",
      urlToImage:
        "https://assets1.cbsnewsstatic.com/hub/i/r/2020/12/28/05c34d7e-9f16-4c11-9fa9-972d287241a6/thumbnail/1200x630/752b9eac1bb541bead4437b90b80a04f/gettyimages-1292848053.jpg?v=4baa656f7af774a52a8c6a88476cb826",
      publishedAt: "2024-03-22T11:54:00Z",
      content:
        "A former executive at Yoozoo Games was sentenced to death on Friday in the 2020 poisoning of the founder of the high-profile Chinese gaming company, which has links to Game of Thrones and the new Net… [+1867 chars]",
    },
    {
      source: {
        id: "cnn",
        name: "CNN",
      },
      author: "Sara Smart, Chris Isidore",
      title:
        "FBI tells Alaska Airlines passengers they may be ‘victim of a crime’ - CNN",
      description:
        "Passengers on board the Alaska Airlines Boeing 737 Max 9 that suffered a terrifying midair blowout in January have received a letter from the FBI saying they may be victims “of a crime.”",
      url: "https://www.cnn.com/2024/03/22/business/alaska-airlines-fbi-passengers-crime-victims/index.html",
      urlToImage:
        "https://media.cnn.com/api/v1/images/stellar/prod/gettyimages-1910141194.jpg?c=16x9&q=w_800,c_fill",
      publishedAt: "2024-03-22T11:35:00Z",
      content:
        "Passengers on board the Alaska Airlines Boeing 737 Max 9 that suffered a terrifying midair blowout in January have received a letter from the FBI saying they may be victims of a crime.\r\nAttorney Mark… [+4667 chars]",
    },
    {
      source: {
        id: null,
        name: "BBC News",
      },
      author: null,
      title:
        "Apple lawsuit: US accuses tech giant of monopolising smartphone market - BBC.com",
      description:
        "In a landmark lawsuit, the justice department alleges the company uses its power to limit competition.",
      url: "https://www.bbc.com/news/world-us-canada-68628989",
      urlToImage:
        "https://ichef.bbci.co.uk/news/1024/branded_news/153FE/production/_132983078_iphone-index-getty.jpg",
      publishedAt: "2024-03-22T11:14:18Z",
      content: null,
    },
    {
      source: {
        id: null,
        name: "Minnesota Public Radio News",
      },
      author: "MPR News Staff",
      title:
        "First round of snow winding down across Minnesota; all eyes on weekend storm - MPR News",
      description:
        "The first in a one-two punch of winter weather dropped several inches of snow overnight across much of Minnesota, leaving slippery roads for the Friday morning commute.",
      url: "https://www.mprnews.org/story/2024/03/22/minnesota-snow-winter-storm-road-conditions",
      urlToImage:
        "https://img.apmcdn.org/71074669de362e429bb5fe4a8cfaa0e3277305db/widescreen/49ac90-20230314-a-snowplow-clearing-snow-webp2000.webp",
      publishedAt: "2024-03-22T10:48:00Z",
      content:
        "The first in a one-two punch of winter weather dropped several inches of snow overnight across much of Minnesota, leaving slippery roads for the Friday morning commute and accounting for nearly 300 c… [+3558 chars]",
    },
    {
      source: {
        id: "cnn",
        name: "CNN",
      },
      author: "Nectar Gan",
      title:
        "Netflix blockbuster ‘3 Body Problem’ divides opinion and sparks nationalist anger in China - CNN",
      description:
        "A Netflix adaptation of wildly popular Chinese sci-fi novel “The Three-Body Problem” has split opinions in China and sparked online nationalist anger over scenes depicting a violent and tumultuous period in the country’s modern history.",
      url: "https://www.cnn.com/2024/03/22/style/china-reaction-netflix-show-3-body-problem-intl-hnk/index.html",
      urlToImage:
        "https://media.cnn.com/api/v1/images/stellar/prod/3bp-101-unit-05865rc-jpg-3bp-101-unit-05865rc.jpg?c=16x9&q=w_800,c_fill",
      publishedAt: "2024-03-22T10:24:00Z",
      content:
        "A Netflix adaptation of wildly popular Chinese sci-fi novel The Three-Body Problem has split opinions in China and sparked online nationalist anger over scenes depicting a violent and tumultuous peri… [+3782 chars]",
    },
    {
      source: {
        id: "cnn",
        name: "CNN",
      },
      author:
        "Caitlin Stephen Hu, David Culver, Harold Isaac, Evelio Contreras",
      title:
        "Carnage on the streets of Port-au-Prince as world stalls on a promised intervention for Haiti - CNN",
      description:
        "Human remains lie in the streets of the Haitian capital, yet a multinational security mission long touted by the country’s neighbors as a gamechanger for its gang problem is nowhere to be found.",
      url: "https://www.cnn.com/2024/03/21/americas/haiti-council-gang-intl-latam/index.html",
      urlToImage:
        "https://media.cnn.com/api/v1/images/stellar/prod/11-haiti-culver-cnn-032124.jpg?c=16x9&q=w_800,c_fill",
      publishedAt: "2024-03-22T09:42:00Z",
      content:
        "A woman hustles her young child into a waiting car, half-dragging him as she shields his eyes. Other family members follow with heavy suitcases, averting their eyes too. Theyre leaving the city, even… [+9172 chars]",
    },
  ];

  const updatepage=async()=> {
    props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=b8863cf967ab4f648aac599f72e07d0a&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    let data = await fetch(url);
    props.setProgress(30);
    let parsedata = await data.json();
    props.setProgress(70);
    setArticles(parsedata.articles);
    setTotalResults(parsedata.totalResults);
    setLoading(false);
    props.setProgress(100);
  }
  useEffect(() => {  //refactoring class based component into functions based component using hooks
    updatepage();
  },[]
  )
  const fetchMoreData = async () => {
    setPage(page + 1);
    const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=b8863cf967ab4f648aac599f72e07d0a&page=${page}&pageSize=${props.pageSize}`;
    let data = await fetch(url);
    let parsedata = await data.json();
   
    setArticles(articles.concat(parsedata.articles));
    setTotalResults(parsedata.totalResults);
  };

 
    return (
      <>
        <h1 className="text-center my-3">NewsMonkey-Top Headlines</h1>
        {/*loading && <Spinner />} {/*if loading is true then spinner will appear*/}
        <InfiniteScroll //using built-in component
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length !== totalResults}
          loader={<Spinner />} //adding component
        >
          <div className="container">
            <div className="row">
              {articles.map((element) => {
                return (
                  <div className="col-md-4 my-3">
                    <NewsItem
                      key={element.url}
                      title={element.title ? element.title : " "}
                      description={
                        element.description ? element.description : " "
                      }
                      imgurl={element.urlToImage}
                      newsurl={element.url}
                      author={element.author}
                      date={element.publishedAt}
                      source={element.source.name}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </InfiniteScroll>
      </>
    );
  }
News.defaultProps = {
  country:'in',
  pageSize: 8,
  category:'general',
}
News.propTypes = {
  country: Proptypes.string,
  pageSize: Proptypes.number,
  category:Proptypes.string,

}

export default News;
