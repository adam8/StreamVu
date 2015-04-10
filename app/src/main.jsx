// React Router
var Router = ReactRouter;
var Route = Router.Route;
var Routes = Router.Routes;
var DefaultRoute = Router.DefaultRoute;
var Link = Router.Link;
var Navigation = Router.Navigation;
var RouteHandler = Router.RouteHandler;

// Initalize Touch Events
React.initializeTouchEvents(true);

// Convenience 
function slugify(text) {
  // console.log('slugify: TODO: get rid of this!');
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/\:+/g, '-')           // Replace colon with dash
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .trim()                         // Trim whitespace
}
function randomStr(num) {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for( var i=0; i < num; i++ ) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}

// Hard Coded Events
var eventJson = [ {
                  "id":"2015-04-13-05-15-ppp",
                  "event_date":"2015-04-13",
                  "event_time":"05:15",
                  "stream_date":"2015-04-13",
                  "stream_time":"07:15",
                  "channel":"maintenance",
                  "stream":"equipment",
                  "priority":"low",
                  "event":"3514 out of service, repair to electrical, last down 3/21, uptime 140 hrs",
                  "link":""
                },
                {
                  "id":"2015-04-13-07-15-qqq",
                  "event_date":"2015-04-13",
                  "event_time":"07:15",
                  "stream_date":"2015-04-13",
                  "stream_time":"07:45",
                  "channel":"operations",
                  "stream":"forecast",
                  "priority":"high",
                  "event":"shortage forecast today, -3 30's, afternoon shift",
                  "link":"m.ax/z74y"
                },
                {
                  "id":"2015-04-13-07-15-icuy",
                  "event_date":"2015-04-13",
                  "event_time":"07:15",
                  "stream_date":"2015-04-13",
                  "stream_time":"07:50",
                  "channel":"maintenance",
                  "stream":"equipment",
                  "priority":"low",
                  "event":"3512 out of service, repair to electrical, last down 2/14, uptime 35 hrs",
                  "link":""
                },
                {
                  "id":"2015-04-13-07-20-ixuyw",
                  "event_date":"2015-04-13",
                  "event_time":"07:20",
                  "stream_date":"2015-04-13",
                  "stream_time":"07:50",
                  "channel":"maintenance",
                  "stream":"equipment",
                  "priority":"low",
                  "event":"3510 out of service, repair to electrical, WARNING last down 3/28 for electrical, uptime 23 hrs",
                  "link":""
                },
                {
                  "id":"2015-04-13-08-00-xiryt",
                  "event_date":"2015-04-13",
                  "event_time":"08:00",
                  "stream_date":"2015-04-13",
                  "stream_time":"08:00",
                  "channel":"operations",
                  "stream":"forecast",
                  "priority":"high",
                  "event":"shortage forecast today, -3 RS, day shift",
                  "link":"m.ax/kj8l"
                },
                {
                  "id":"2015-04-13-08-00-xuw",
                  "event_date":"2015-04-13",
                  "event_time":"08:00",
                  "stream_date":"2015-04-13",
                  "stream_time":"08:00",
                  "channel":"operations",
                  "stream":"equipment",
                  "priority":"high",
                  "event":"RS10 out of service, PM service, estimated return to service 4/13 20:00",
                  "link":""
                },
                {
                  "id":"2015-04-13-08-00-ciw",
                  "event_date":"2015-04-13",
                  "event_time":"08:00",
                  "stream_date":"2015-04-13",
                  "stream_time":"08:00",
                  "channel":"maintenance",
                  "stream":"equipment",
                  "priority":"high",
                  "event":"RS10 out of service, PM service",
                  "link":""
                },
                {
                  "id":"2015-04-13-08-00-xuyw",
                  "event_date":"2015-04-13",
                  "event_time":"08:00",
                  "stream_date":"2015-04-13",
                  "stream_time":"08:00",
                  "channel":"my-events",
                  "stream":"approval",
                  "priority":"low",
                  "event":"approve PR 2312, stores reorder, $1920",
                  "link":"m.ax/d9ij"
                },
                {
                  "id":"2015-04-13-20-00-icuwq",
                  "event_date":"2015-04-13",
                  "event_time":"20:00",
                  "stream_date":"2015-04-13",
                  "stream_time":"20:00",
                  "channel":"operations",
                  "stream":"equipment",
                  "priority":"low",
                  "event":"RS10 return to service, PM service, down for 12 hrs",
                  "link":""
                },
                {
                  "id":"2015-04-13-20-00-ixuiw",
                  "event_date":"2015-04-13",
                  "event_time":"20:00",
                  "stream_date":"2015-04-13",
                  "stream_time":"20:00",
                  "channel":"maintenance",
                  "stream":"equipment",
                  "priority":"low",
                  "event":"RS10 return to service, PM service, down for 12 hrs, actuals $4500",
                  "link":""
                },
                {
                  "id":"2015-04-13-08-00-sux",
                  "event_date":"2015-04-13",
                  "event_time":"08:00",
                  "stream_date":"2015-04-13",
                  "stream_time":"09:15",
                  "channel":"operations",
                  "stream":"equipment",
                  "priority":"high",
                  "event":"RS11 out of service, repair to hydraulics",
                  "link":""
                },
                {
                  "id":"2015-04-13-08-00-uvyw",
                  "event_date":"2015-04-13",
                  "event_time":"08:00",
                  "stream_date":"2015-04-13",
                  "stream_time":"09:15",
                  "channel":"maintenance",
                  "stream":"equipment",
                  "priority":"high",
                  "event":"RS11 out of service, repair to hydraulics, last down 3/24, uptime 160 hrs",
                  "link":""
                },
                {
                  "id":"2015-04-13-09-20-vyyq",
                  "event_date":"2015-04-13",
                  "event_time":"09:20",
                  "stream_date":"2015-04-13",
                  "stream_time":"09:35",
                  "channel":"operations",
                  "stream":"vessel",
                  "priority":"low",
                  "event":"MV Swift delayed arrival by 16 hrs, now arriving 4/14 06:00",
                  "link":"m.ax/s7fd"
                },
                {
                  "id":"2015-04-13-10-35-vhyt",
                  "event_date":"2015-04-13",
                  "event_time":"10:35",
                  "stream_date":"2015-04-13",
                  "stream_time":"10:45",
                  "channel":"operations",
                  "stream":"vessel",
                  "priority":"low",
                  "event":"MV Taylor arriving early by 8 hrs, now arriving 4/15 16:00",
                  "link":"m.ax/d90t"
                },
                {
                  "id":"2015-04-13-11-15-sjxy",
                  "event_date":"2015-04-13",
                  "event_time":"11:15",
                  "stream_date":"2015-04-13",
                  "stream_time":"11:15",
                  "channel":"maintenance",
                  "stream":"equipment",
                  "priority":"low",
                  "event":"3514 return to service, down for 6 hrs",
                  "link":""
                },
                {
                  "id":"2015-04-13-14-10-bcgs",
                  "event_date":"2015-04-13",
                  "event_time":"14:10",
                  "stream_date":"2015-04-13",
                  "stream_time":"14:10",
                  "channel":"maintenance",
                  "stream":"equipment",
                  "priority":"low",
                  "event":"RS11 return to service, repair to cooling system, down for 56 hrs, actual $5600",
                  "link":""
                },
                {
                  "id":"2015-04-13-11-35-ksdfj",
                  "event_date":"2015-04-13",
                  "event_time":"11:35",
                  "stream_date":"2015-04-13",
                  "stream_time":"11:35",
                  "channel":"maintenance",
                  "stream":"equipment",
                  "priority":"high",
                  "event":"SUB.17 high level alarm ON",
                  "link":""
                },
                {
                  "id":"2015-04-13-11-45-cgt",
                  "event_date":"2015-04-13",
                  "event_time":"11:45",
                  "stream_date":"2015-04-13",
                  "stream_time":"11:45",
                  "channel":"maintenance",
                  "stream":"equipment",
                  "priority":"high",
                  "event":"SUB.17 high level alarm ON > 10 minutes",
                  "link":""
                },
                {
                  "id":"2015-04-13-11-55-xbvcw",
                  "event_date":"2015-04-13",
                  "event_time":"11:55",
                  "stream_date":"2015-04-13",
                  "stream_time":"11:55",
                  "channel":"maintenance",
                  "stream":"equipment",
                  "priority":"high",
                  "event":"SUB.17 high level alarm ON > 10 minutes",
                  "link":""
                },
                {
                  "id":"2015-04-13-12-02-cskjvb",
                  "event_date":"2015-04-13",
                  "event_time":"12:02",
                  "stream_date":"2015-04-13",
                  "stream_time":"12:02",
                  "channel":"maintenance",
                  "stream":"equipment",
                  "priority":"low",
                  "event":"SUB.17 high level alarm OFF",
                  "link":""
                },
                {
                  "id":"2015-04-13-12-02-nxv",
                  "event_date":"2015-04-13",
                  "event_time":"12:02",
                  "stream_date":"2015-04-13",
                  "stream_time":"12:02",
                  "channel":"my-events",
                  "stream":"flagged",
                  "priority":"low",
                  "event":"SUB.17 high level alarm OFF",
                  "link":""
                },
                {
                  "id":"2015-04-14-06-18-ytwe",
                  "event_date":"2015-04-14",
                  "event_time":"06:18",
                  "stream_date":"2015-04-14",
                  "stream_time":"07:30",
                  "channel":"operations",
                  "stream":"equipment",
                  "priority":"high",
                  "event":"RS10 out of service, repair to electrical",
                  "link":""
                },
                {
                  "id":"2015-04-14-06-18-jgjh",
                  "event_date":"2015-04-14",
                  "event_time":"06:18",
                  "stream_date":"2015-04-14",
                  "stream_time":"07:30",
                  "channel":"maintenance",
                  "stream":"equipment",
                  "priority":"high",
                  "event":"RS10 out of service, repair to electrical, WARNING last down 4/13, uptime 7 hrs",
                  "link":""
                },
                {
                  "id":"2015-04-14-08-00-askdf",
                  "event_date":"2015-04-14",
                  "event_time":"08:00",
                  "stream_date":"2015-04-14",
                  "stream_time":"08:00",
                  "channel":"maintenance",
                  "stream":"KPI",
                  "priority":"low",
                  "event":"KPI, reachstacker, PM completion within 5 days, target=90%, actual 80%",
                  "link":"m.ax/d87w"
                },
                {
                  "id":"2015-04-14-08-00-nvbc",
                  "event_date":"2015-04-14",
                  "event_time":"08:00",
                  "stream_date":"2015-04-14",
                  "stream_time":"08:00",
                  "channel":"operations",
                  "stream":"vessel",
                  "priority":"low",
                  "event":"MV Swift load started, expected completion 4/15 12:30",
                  "link":"m.ax/b74y"
                },
                {
                  "id":"2015-04-14-09-15-poi",
                  "event_date":"2015-04-14",
                  "event_time":"09:15",
                  "stream_date":"2015-04-14",
                  "stream_time":"08:00",
                  "channel":"operations",
                  "stream":"equipment",
                  "priority":"low",
                  "event":"RS10 update: parts arriving 4/15, expected return to service 4/15 16:00",
                  "link":""
                },
                {
                  "id":"2015-04-14-10-15-nbmn",
                  "event_date":"2015-04-14",
                  "event_time":"10:15",
                  "stream_date":"2015-04-14",
                  "stream_time":"10:15",
                  "channel":"maintenance",
                  "stream":"work",
                  "priority":"high",
                  "event":"SUB3 work starting in confined space",
                  "link":""
                },
                {
                  "id":"2015-04-14-10-45-ytrd",
                  "event_date":"2015-04-14",
                  "event_time":"10:45",
                  "stream_date":"2015-04-14",
                  "stream_time":"11:30",
                  "channel":"operations",
                  "stream":"equipment",
                  "priority":"high",
                  "event":"RS04 out of service, repair to cab",
                  "link":""
                },
                {
                  "id":"2015-04-14-10-45-try",
                  "event_date":"2015-04-14",
                  "event_time":"10:45",
                  "stream_date":"2015-04-14",
                  "stream_time":"11:30",
                  "channel":"maintenance",
                  "stream":"equipment",
                  "priority":"high",
                  "event":"RS04 out of service, repair to cab, last down 3/13, uptime 119 hrs",
                  "link":""
                },
                {
                  "id":"2015-04-14-11-30-pkju",
                  "event_date":"2015-04-14",
                  "event_time":"11:30",
                  "stream_date":"2015-04-14",
                  "stream_time":"11:30",
                  "channel":"my-events",
                  "stream":"approval",
                  "priority":"low",
                  "event":"approve PR 2321, tires for RS04, $16800",
                  "link":"m.ax/kj8l"
                },
                {
                  "id":"2015-04-14-12-00-ydfs",
                  "event_date":"2015-04-14",
                  "event_time":"12:00",
                  "stream_date":"2015-04-14",
                  "stream_time":"12:00",
                  "channel":"operations",
                  "stream":"equipment",
                  "priority":"high",
                  "event":"shortage forecast tomorrow, -2 RS, day shift",
                  "link":"m.ax/34de"
                },
                {
                  "id":"2015-04-14-12-00-uio",
                  "event_date":"2015-04-14",
                  "event_time":"12:00",
                  "stream_date":"2015-04-14",
                  "stream_time":"12:00",
                  "channel":"operations",
                  "stream":"equipment",
                  "priority":"low",
                  "event":"RS08 return to service, PM service, down for 4 days",
                  "link":""
                },
                {
                  "id":"2015-04-14-12-00-hry",
                  "event_date":"2015-04-14",
                  "event_time":"12:00",
                  "stream_date":"2015-04-14",
                  "stream_time":"12:00",
                  "channel":"maintenance",
                  "stream":"equipment",
                  "priority":"low",
                  "event":"RS08 return to service, PM service, down for 4 days, actuals $32,000",
                  "link":""
                },
                {
                  "id":"2015-04-14-12-40-asd",
                  "event_date":"2015-04-14",
                  "event_time":"12:40",
                  "stream_date":"2015-04-14",
                  "stream_time":"12:40",
                  "channel":"operations",
                  "stream":"equipment",
                  "priority":"high",
                  "event":"CV17 throughput at 70% for >10 minutes",
                  "link":""
                },
                {
                  "id":"2015-04-14-12-34-xiv",
                  "event_date":"2015-04-14",
                  "event_time":"12:34",
                  "stream_date":"2015-04-14",
                  "stream_time":"12:50",
                  "channel":"maintenance",
                  "stream":"equipment",
                  "priority":"low",
                  "event":"3517 out of service, repair to fuel system, last down 4/12, uptime 12 hrs",
                  "link":""
                },
                {
                  "id":"2015-04-14-13-30-sy",
                  "event_date":"2015-04-14",
                  "event_time":"13:30",
                  "stream_date":"2015-04-14",
                  "stream_time":"13:30",
                  "channel":"operations",
                  "stream":"equipment",
                  "priority":"low",
                  "event":"CV17 throughput back to 100%",
                  "link":""
                },
                {
                  "id":"2015-04-14-14-12-jrv",
                  "event_date":"2015-04-14",
                  "event_time":"14:12",
                  "stream_date":"2015-04-14",
                  "stream_time":"14:12",
                  "channel":"operations",
                  "stream":"vessel",
                  "priority":"low",
                  "event":"MV Susanne arrival delayed by 36 hrs, now arriving 4/16 02:00",
                  "link":"m.ax/39aq"
                },
                {
                  "id":"2015-04-14-14-15-jge",
                  "event_date":"2015-04-14",
                  "event_time":"14:15",
                  "stream_date":"2015-04-14",
                  "stream_time":"14:15",
                  "channel":"operations",
                  "stream":"equipment",
                  "priority":"high",
                  "event":"RS04 return to service, repair, down for 3 hrs",
                  "link":""
                },
                {
                  "id":"2015-04-14-14-15-yyr",
                  "event_date":"2015-04-14",
                  "event_time":"14:15",
                  "stream_date":"2015-04-14",
                  "stream_time":"14:15",
                  "channel":"maintenance",
                  "stream":"equipment",
                  "priority":"high",
                  "event":"RS04 return to service, repair, down for 3 hrs, actuals $1200",
                  "link":""
                },
                {
                  "id":"2015-04-14-14-40-uuuu",
                  "event_date":"2015-04-14",
                  "event_time":"14:40",
                  "stream_date":"2015-04-14",
                  "stream_time":"14:40",
                  "channel":"maintenance",
                  "stream":"equipment",
                  "priority":"high",
                  "event":"ELEC.140 electrical fault, last fault 46 days ",
                  "link":""
                },
                {
                  "id":"2015-04-14-14-10-kkk",
                  "event_date":"2015-04-14",
                  "event_time":"14:50",
                  "stream_date":"2015-04-14",
                  "stream_time":"14:50",
                  "channel":"operations",
                  "stream":"vessel",
                  "priority":"low",
                  "event":"MV Sky Dream delayed arrival by 16 hrs, now arriving 4/15 07:00",
                  "link":"m.ax/s7fd"
                },
                {
                  "id":"2015-04-14-16-10-mmm",
                  "event_date":"2015-04-14",
                  "event_time":"16:10",
                  "stream_date":"2015-04-14",
                  "stream_time":"16:10",
                  "channel":"maintenance",
                  "stream":"work",
                  "priority":"low",
                  "event":"DL.133 wo# 34511 overhaul, project budget $20,000, actual $25,500",
                  "link":"m.ax/v0kj"
                },
                {
                  "id":"2015-04-14-16-10-nnn",
                  "event_date":"2015-04-14",
                  "event_time":"16:10",
                  "stream_date":"2015-04-14",
                  "stream_time":"16:10",
                  "channel":"my-events",
                  "stream":"flagged",
                  "priority":"low",
                  "event":"DL.133 wo# 34511 overhaul, project budget $20,000, actual $25,500",
                  "link":"m.ax/v0kj"
                },
                {
                  "id":"2015-04-15-06-00-vbbb",
                  "event_date":"2015-04-15",
                  "event_time":"06:00",
                  "stream_date":"2015-04-15",
                  "stream_time":"06:00",
                  "channel":"operations",
                  "stream":"equipment",
                  "priority":"high",
                  "event":"RS08 out of service, repair to hydraulics",
                  "link":""
                },
                {
                  "id":"2015-04-15-06-00-vvv",
                  "event_date":"2015-04-15",
                  "event_time":"06:00",
                  "stream_date":"2015-04-15",
                  "stream_time":"06:00",
                  "channel":"maintenance",
                  "stream":"equipment",
                  "priority":"high",
                  "event":"RS08 out of service, repair to hydraulics, WARNING 1 day since PM completed, 16 hrs uptime",
                  "link":""
                },
                {
                  "id":"2015-04-15-06-00-ccc",
                  "event_date":"2015-04-15",
                  "event_time":"06:00",
                  "stream_date":"2015-04-15",
                  "stream_time":"06:00",
                  "channel":"my-events",
                  "stream":"flagged",
                  "priority":"low",
                  "event":"RS08 out of service, repair to hydraulics, WARNING 1 day since PM completed, 16 hrs uptime",
                  "link":""
                },
                {
                  "id":"2015-04-15-11-30-zzz",
                  "event_date":"2015-04-15",
                  "event_time":"11:30",
                  "stream_date":"2015-04-15",
                  "stream_time":"11:30",
                  "channel":"operations",
                  "stream":"vessel",
                  "priority":"low",
                  "event":"MV Swift load completed, actual 56000 tons",
                  "link":""
                },
                {
                  "id":"2015-04-15-08-00-xxx",
                  "event_date":"2015-04-15",
                  "event_time":"08:00",
                  "stream_date":"2015-04-15",
                  "stream_time":"08:00",
                  "channel":"maintenance",
                  "stream":"equipment",
                  "priority":"low",
                  "event":"Warning: RS03 down > 5 days, expected return date <not known>",
                  "link":""
                },
                {
                  "id":"2015-04-15-08-00-yyy",
                  "event_date":"2015-04-15",
                  "event_time":"08:00",
                  "stream_date":"2015-04-15",
                  "stream_time":"08:00",
                  "channel":"my-events",
                  "stream":"flagged",
                  "priority":"low",
                  "event":"Warning: RS03 down > 5 days, expected return date <not known>",
                  "link":""
                },
                {
                  "id":"2015-04-15-08-00-tttt",
                  "event_date":"2015-04-15",
                  "event_time":"08:00",
                  "stream_date":"2015-04-15",
                  "stream_time":"08:00",
                  "channel":"maintenance",
                  "stream":"equipment",
                  "priority":"low",
                  "event":"Warning: 2507 down > 5 days, expected return date 4/20, waiting for material",
                  "link":""
                },
                {
                  "id":"2015-04-15-12-00-ddd",
                  "event_date":"2015-04-15",
                  "event_time":"12:00",
                  "stream_date":"2015-04-15",
                  "stream_time":"12:00",
                  "channel":"maintenance",
                  "stream":"equipment",
                  "priority":"low",
                  "event":"RS10 return to service, repair, down for 30 hours.",
                  "link":""
                },
                {
                  "id":"2015-04-15-12-00-sss",
                  "event_date":"2015-04-15",
                  "event_time":"12:00",
                  "stream_date":"2015-04-15",
                  "stream_time":"12:00",
                  "channel":"operations",
                  "stream":"equipment",
                  "priority":"low",
                  "event":"RS10 return to service, repair, down for 30 hours",
                  "link":""
                },
                {
                  "id":"2015-04-15-16-00-www",
                  "event_date":"2015-04-15",
                  "event_time":"16:00",
                  "stream_date":"2015-04-15",
                  "stream_time":"16:00",
                  "channel":"operations",
                  "stream":"equipment",
                  "priority":"low",
                  "event":"RS11 return to service, repair to cooling system, down for 56 hrs",
                  "link":""
                }
];
eventJson = eventJson.sort(function(a,b) { return b.id.localeCompare(a.id) } );

/****** COMPONENTS *********/

var EventListDate = React.createClass({
  render: function() {
    var day = moment(this.props.date, "YYYY-MM-DD"); 
    return (<div className="event-list-date-row">{ day.format('ddd, MMM Do') }</div>);
  }
});

var CategoryList = React.createClass({ 
  render: function () {
    //console.log("this.props.events",this.props.events);
    var activeStream = this.props.events.activeStream;
    var items = this.props.events.categories.map(function(item, index) {
      var subs = [];
      var subs_array = item.subs.map(function(sub) {
        subs.push(sub);
      }.bind(this));
      var prioritiesLow = [];
      var prioritiesHigh = [];
      var alerts = this.props.events.events.map(function(event) {
        if ((event.channel == item.slug) && event.priority == "low") {
          prioritiesLow.push(event);
        } else if (event.channel == item.slug && event.priority == "high") {
          prioritiesHigh.push(event);
        }
      }.bind(this));
      //console.log("activeStream!?!?",this.props.events.activeStream);
      return (
        <div className={"category-list-item category-list-" + item.slug} key={index} onClick={this.onClick.bind(this, item)} onTouchStart={this.onTouchStart.bind(this, item)}>

          <div className="category-alerts">
            <div className={ prioritiesLow.length > 0 ? 'category-alert category-alert-low' : 'hidden' }>{ prioritiesLow.length }</div>
            <div className={ prioritiesHigh.length > 0 ? 'category-alert category-alert-high' : 'hidden' }>{ prioritiesHigh.length }</div>
          </div>
    
          <div className="category-title">
            <h2>
              { item.category }
            </h2>
          </div>
          
          { subs.length ? <SubCategoryList category={ item.category } activeStream={ this.props.events.activeStream } subs={ subs } />  : '' }
          
          <div className="events-inline">
            <EventList events={ this.props.events } />
          </div>
          
        </div> 
      );
    }.bind(this));
    return <div className="category-list">{items}</div>;
  },
  onClick: function(item) {
    this.props.onTabClick(item);
  },
  onTouchStart: function(item) {
    this.props.onTouchStart(item); 
  }
});

var SubCategoryList = React.createClass({ 
  render: function () {
    var cat = this.props.category;
    var activeStream = this.props.activeStream;
    var items = this.props.subs.map(function(item, index) {
      return (
        <div className={slugify(item)==activeStream ? 'sub-category-list-item sub-category-active' : 'sub-category-list-item' } key={index}>
        <a href={ "/#/c/" + slugify(cat) + "/" + slugify(item) }>{item}</a>
        </div>
      );
    });
    return <div className="sub-category-list">
    <div className={activeStream=='all' ? 'sub-category-list-item sub-category-active' : 'sub-category-list-item'}><a href={"/#/c/" + slugify(cat) }>All</a></div>
      {items}
    </div>;
  }
});

var EventList = React.createClass({
  render: function () {
    // console.log("activePage:", this.props.events.activePage);
    // console.log("activeChannel:", this.props.events.activeChannel);
    // console.log("activeStream:", this.props.events.activeStream);
    if (this.props.events) {
      // var reverseEventsTemp = this.props.events.events.reverse();
      // var reverseEventsTemp = this.props.events.events;
      var rows = [];
      var lastCategory = null;
      this.props.events.events.forEach(function(event, index) {
        if (this.props.events.activeChannel !== '') {
          if (event.channel.toLowerCase().indexOf(this.props.events.activeChannel) === -1) {
            return;
          }
        }
        if (this.props.events.activeStream !== '' && this.props.events.activeStream !== 'all') {
          if (event.stream.toLowerCase().indexOf(this.props.events.activeStream) === -1) {
            return;
          }
        }
        if (event.event.toLowerCase().indexOf(this.props.events.filterText) === -1) {
            return;
        }
        if (event.event_date !== lastCategory) {
          //console.log('key', "date-item-" + this.props.events.activeChannel + '-' + this.props.events.activeStream + '-' + index);
          rows.push(<EventListDate date={event.event_date} key={ index + randomStr(5) } />);
        }
        rows.push(<EventListItem event={event} key={ randomStr(5) } />);
        lastCategory = event.event_date;
      }.bind(this));
    }
    return <div className="event-list">{rows}</div>;
  }
});

var EventListItem = React.createClass({
  contextTypes: {
    router: React.PropTypes.func
  },
  render: function() {
    return (
        <div id={ 'id-' + this.props.event.id } key={ 'id-' + this.props.event.id } className={ 'event-list-item item-priority-' + this.props.event.priority }>
        <div className="event-time">{ this.props.event.event_time }</div>
        <div className="event-item-column event-title"><div className="event-item-priority-indicator"></div><a href={"/#/event/"+this.props.event.id}>{ this.props.event.event }</a>  {/* { this.props.event.channel } - { this.props.event.stream } */} </div>
          <div className="event-item-actions">
            <div className="event-action event-item-flag">
              {/* <img src="/images/icon-comment-discussion.png" /> */}
              <span>{ this.props.event.priority == 'high' ? 'Unflag' : 'Flag' }</span>
            </div>
            <div className="event-action event-item-discuss">
              {/* <img src="/images/icon-comment-discussion.png" /> */}
              <span>Assign</span>
            </div>
            <div className="event-action event-item-ok">
              {/* <img src="/images/icon-check.png" /> */}
              <span>Dismiss</span>
            </div>
          </div>
        </div>
      )        
  }
});

var EventItemDetail = React.createClass({
    contextTypes: {
      router: React.PropTypes.func
    },
    render: function() {
      var eventId = this.context.router.getCurrentParams().eventId;
      var item;
      for (i in this.props.events.events) {
        if(this.props.events.events[i].id && this.props.events.events[i].id === eventId) {
         item = this.props.events.events[i];
        }
      };
      var day = moment(item.event_date, "YYYY-MM-DD"); 
      return (
        <div className="event-item-detail">
          <table>
            <tr>
              <td>Description</td>
              <td>{ item.event }</td>
            </tr>
            <tr>
              <td>Date</td>
              <td>{ day.format('ddd, MMM Do') }</td>
            </tr>
            <tr>
              <td>Time</td>
              <td>{ item.event_time }</td>
            </tr>
            <tr>
              <td>Channel</td>
              <td><a href={"/#/c/" + item.channel }>{ item.channel }</a></td>
            </tr>
            <tr>
              <td>Stream</td>
              <td><a href={"/#/c/" + item.channel + "/" + item.stream }>{ item.stream }</a></td>
            </tr>
            <tr>
              <td>Priority</td>
              <td>{ item.priority }</td>
            </tr>
            <tr>
              <td>Link</td>
              <td>{ item.link == '' ? 'no link' : item.link }</td>
            </tr>
            <tr>
              <td>Event Type History</td>
              <td>TODO</td>
            </tr>
            <tr>
              <td>Actions</td>
              <td>
                <button>Flag</button>
                <button>Assign</button>
                <button>Dismiss</button>
              </td>
            </tr>
          </table>
        </div>
      );
    }
}); 

var SearchBar = React.createClass({
    handleChange: function() {
        this.props.onUserInput(
            this.refs.filterTextInput.getDOMNode().value
        );
    },
    render: function() {
        return (
          <form onSubmit={this.handleSubmit} className="search-box">
              <input
                  type="text"
                  placeholder="Search"
                  value={this.props.filterText}
                  ref="filterTextInput"
                  onChange={this.handleChange}
              />
          </form>
        );
    }
});

var TimeBox = React.createClass({
    render: function() {
      return (
        <div className={'time-options active-time-' + this.props.timeFilter}>
          <TimeBoxButton thisTime='shift' handleChangeTime={this.props.handleChangeTime} />
          <TimeBoxButton thisTime='today' handleChangeTime={this.props.handleChangeTime} />
          <TimeBoxButton thisTime='week' handleChangeTime={this.props.handleChangeTime} />
        </div>
      );
    }
});

var TimeBoxButton = React.createClass({
    onChangeTime: function(e) {
      this.props.handleChangeTime(this.props.thisTime);
    },
    render: function() {
      return (
        <div onClick={ this.onChangeTime } ref="changeTimer" className={"time-box-" + this.props.thisTime}>
          <span>{this.props.thisTime}</span>
        </div>
      )
    }
});

var App = React.createClass({
  mixins: [Router.State, Navigation],
  contextTypes: {
    router: React.PropTypes.func
  },
  handleItemClick: function(item) {
    if (this.state.activePage == slugify(item.category) ) {
      this.transitionTo('/'); 
    } else {
      this.transitionTo('/c/' + slugify(item.category) ); 
    }
  },
  handleUserInput: function(filterText) {
    this.setState({
      filterText: filterText
    });
  },
  handleChangeTime: function(newTime) {
    this.setState({
      timeFilter: newTime
    });
  },
  getInitialState: function() {
    var activePage = '';
    var activeChannel = '';
    var activeStream = 'all';

    if (this.context.router.getCurrentParams().channelId && !this.context.router.getCurrentParams().streamId) {
      activePage = this.context.router.getCurrentParams().channelId;
      activeStream = 'all';
      activeChannel = this.context.router.getCurrentParams().channelId; 
    } else if (this.context.router.getCurrentParams().streamId) {
      activePage = this.context.router.getCurrentParams().channelId;
      activeChannel = this.context.router.getCurrentParams().channelId;
      activeStream = this.context.router.getCurrentParams().streamId; 
    } else if (this.context.router.getCurrentParams().eventId) {
      activeChannel = '';
      activeStream = 'all';
      activePage = this.context.router.getCurrentParams().eventId; 
    } else if (this.context.router.getCurrentParams().categoryId) {
      activeChannel = this.context.router.getCurrentParams().categoryId;
      activeStream = 'all';
      activePage = this.context.router.getCurrentParams().categoryId; 
    } else {
      activeChannel = '';
      activeStream = 'all';
      activePage = "home"; 
    }
    // console.log('activeStream',activeStream);
    // console.log('activeChannel',activePage);
    // console.log('activePage',activePage);
    return { 
      events: eventJson,
      selectedItem: this.getParams().eventId,
      activePage: activePage,
      activeChannel: activeChannel,
      activeStream: activeStream,
      filterText: '',
      timeFilter: 'week',
      categories: [{'category':'My Events','slug':'my-events','subs':['Approval','Flagged']},{'category':'Maintenance','slug':'maintenance','subs':['Equipment','Inventory','Purchasing','Work']},{'category':'Operations','slug':'operations','subs':['Vessel','Equipment Forecast','Volume','Equipment']},{'category':'Safety','slug':'safety','subs':['Incident','Environmental','Public Complaint','Work']},{'category':'Finance','slug':'finance','subs':['Forecast','History']}]
    };
  },
  componentDidMount: function () {
    Router.HashLocation.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    Router.HashLocation.removeChangeListener(this._onChange);
  },
  _onChange: function() {
    this.setState({ filterText: '' }); 
    if (this.context.router.getCurrentParams().channelId && !this.context.router.getCurrentParams().streamId) {
      this.setState({ activeChannel: this.context.router.getCurrentParams().channelId }); 
      this.setState({ activeStream: 'all' });
      this.setState({ activePage: this.context.router.getCurrentParams().channelId }); 
    } else if (this.context.router.getCurrentParams().streamId) {
      this.setState({ activeChannel: this.context.router.getCurrentParams().channelId });
      this.setState({ activeStream: this.context.router.getCurrentParams().streamId }); 
      this.setState({ activePage: this.context.router.getCurrentParams().channelId });
    } else if (this.context.router.getCurrentParams().eventId) {
      this.setState({ activeChannel: '' });
      this.setState({ activeStream: 'all' }); 
      this.setState({ activePage: this.context.router.getCurrentParams().eventId }); 
    } else if (this.context.router.getCurrentParams().categoryId) {
      this.setState({ activeChannel: this.context.router.getCurrentParams().categoryId });
      this.setState({ activeStream: 'all' }); 
      this.setState({ activePage: this.context.router.getCurrentParams().categoryId }); 
    } else {
      this.setState({ activeChannel: '' });
      this.setState({ activeStream: 'all' }); 
      this.setState({ activePage: "home" }); 
    }
  },
  render: function () {
    return (
      <div className={ "activePage-" + this.state.activePage + " activeChannel-" + this.state.activeChannel + " activeStream-" + this.state.activeStream }>
        <div id="header">

          <h1><a href="/#/" className="company-logo">Stream|vu</a></h1>

          <div className="breadcrumbs">
            <div className={ this.state.activePage !=='home' ? 'breadcrumb-item breadcrumb-home' : 'hidden' }><a href="/#/">Home</a></div>
            <div className={ this.state.activeChannel !=='' ? 'breadcrumb-item breadcrumb-channel' : 'hidden' }><a href={"#/c/" + this.state.activeChannel }>{ this.state.activeChannel !=='' ? this.state.activeChannel : '' }</a></div>
            <div className={ this.state.activeStream !=='' && this.state.activeStream !== 'all' ? 'breadcrumb-item breadcrumb-stream' : 'hidden' }><a href={"#/c/" + this.state.activeChannel + "/" + this.state.activeStream }>{ this.state.activeStream !=='' ? this.state.activeStream : '' }</a></div>
            <div className={ this.state.filterText !=='' ? 'breadcrumb-item breadcrumb-text' : 'hidden' }><a>{ this.state.filterText !=='' ? this.state.filterText : '' }</a></div>
          </div>
      
          <TimeBox 
            timeFilter={this.state.timeFilter}
            handleChangeTime={this.handleChangeTime} 
          />
          
          <SearchBar 
            filterText={this.state.filterText}
            onUserInput={this.handleUserInput} 
          />
          
          <div className="hamburger">
              <a href="/#/">
                <svg className="inline-svg" version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                	 width="320px" height="320px" viewBox="0 0 32 32" enable-background="new 0 0 32 32">
            					<g className="svg-menu-toggle">
              					<path className="bar" d="M20.945,8.75c0,0.69-0.5,1.25-1.117,1.25H3.141c-0.617,0-1.118-0.56-1.118-1.25l0,0
              						c0-0.69,0.5-1.25,1.118-1.25h16.688C20.445,7.5,20.945,8.06,20.945,8.75L20.945,8.75z">
              					</path>
              					<path className="bar" d="M20.923,15c0,0.689-0.501,1.25-1.118,1.25H3.118C2.5,16.25,2,15.689,2,15l0,0c0-0.689,0.5-1.25,1.118-1.25 h16.687C20.422,13.75,20.923,14.311,20.923,15L20.923,15z">
              					</path>
              					<path className="bar" d="M20.969,21.25c0,0.689-0.5,1.25-1.117,1.25H3.164c-0.617,0-1.118-0.561-1.118-1.25l0,0
              						c0-0.689,0.5-1.25,1.118-1.25h16.688C20.469,20,20.969,20.561,20.969,21.25L20.969,21.25z">
              					</path>
                        {/* needs to be here as a hit area  */}
                        <rect width="320" height="320" fill="none"></rect>
            					</g>
            		</svg>
              </a>
          </div>
                      
        </div>
        
        <RouteHandler events={this.state} 
                      onTabClick={ this.handleItemClick }
                      onTouchStart={this.handleItemClick}
                      handleChangeTime={this.handleChangeTime} />
      </div>
    );
  }
});


/****** ROUTES *********/

var routes = (
  <Route name="home" handler={App} path="/">
    <Route name="CategoryItem" path="c/:categoryId" handler={CategoryList} /> 
    <Route name="EventChannelsStreams" path="c/:channelId/:streamId" handler={CategoryList} />
    <Route name="Event" path="event/:eventId" handler={EventItemDetail} />
    <DefaultRoute handler={CategoryList}/>
  </Route> 
); 

Router.run(routes, function (Handler, state) {
  React.render(<Handler />, document.getElementById('app')); 
});


