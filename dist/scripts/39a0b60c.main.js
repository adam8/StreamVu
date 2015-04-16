function slugify(a){return a.toString().toLowerCase().replace(/\s+/g,"-").replace(/\:+/g,"-").replace(/[^\w\-]+/g,"").replace(/\-\-+/g,"-").trim()}function randomStr(a){for(var b="",c="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",d=0;a>d;d++)b+=c.charAt(Math.floor(Math.random()*c.length));return b}function sortJSON(a){return a.sort(function(a,b){return console.log("sorting..."),b.id.localeCompare(a.id)})}var Router=ReactRouter,Route=Router.Route,Routes=Router.Routes,DefaultRoute=Router.DefaultRoute,Link=Router.Link,Navigation=Router.Navigation,RouteHandler=Router.RouteHandler,EventListDate=React.createClass({displayName:"EventListDate",render:function(){console.log("date here");var a=moment(this.props.date,"YYYY-MM-DD");return React.createElement("div",{className:"event-list-date-row"},a.format("ddd, MMM Do"))}}),CategoryList=React.createClass({displayName:"CategoryList",render:function(){var a=(this.props.events.activeStream,this.props.events.categories.map(function(a,b){var c=2,d=12;return React.createElement("div",{className:"category-list-item category-list-"+a.slug,key:b,onClick:this.onClick.bind(this,a),onTouchStart:this.onTouchStart.bind(this,a)},React.createElement("div",{className:"category-alerts"},React.createElement("div",{className:d>0?"category-alert category-alert-low":"hidden"},d),React.createElement("div",{className:c>0?"category-alert category-alert-high":"hidden"},c)),React.createElement("div",{className:"category-title"},React.createElement("h2",null,a.category)),React.createElement("div",{className:"events-inline"},React.createElement(EventList,{events:this.props.events,user:this.props.events.user})))}.bind(this)));return React.createElement("div",{className:"category-list"},a)},onClick:function(a){this.props.onTabClick(a)},onTouchStart:function(a){this.props.onTouchStart(a)}}),EventList=React.createClass({displayName:"EventList",render:function(){if(this.props.events){var a=[],b=null;this.props.events.events.forEach(function(c){a.push(React.createElement(EventListItem,{event:c,user:this.props.user,key:c.id})),b=c.event_date}.bind(this))}return React.createElement("div",{className:"event-list"},a)}}),EventListItem=React.createClass({displayName:"EventListItem",mixins:[Router.State,Navigation],contextTypes:{router:React.PropTypes.func},getEventDetail:function(a){a.stopPropagation(),a.preventDefault(),this.transitionTo("/event/"+this.props.event.id)},render:function(){var a=!1;return this.props.user.dismissed.indexOf(this.props.event.id)>-1&&(a=!0),React.createElement("div",{id:"id-"+this.props.event.id,key:"id-"+this.props.event.id,className:1==a?"event-dismissed event-list-item item-priority-"+this.props.event.priority:"event-list-item item-priority-"+this.props.event.priority},React.createElement("div",{className:"event-time"},this.props.event.event_time),React.createElement("div",{className:"event-item-column event-title"},React.createElement("div",{className:"event-item-priority-indicator"}),React.createElement("a",{href:"/#/event/"+this.props.event.id,onClick:this.getEventDetail},this.props.event.event)))}}),EventItemDetail=React.createClass({displayName:"EventItemDetail",contextTypes:{router:React.PropTypes.func},render:function(){var a,b=this.context.router.getCurrentParams().eventId;for(i in this.props.events.events)this.props.events.events[i].id&&this.props.events.events[i].id===b&&(a=this.props.events.events[i]);var c=moment(a.event_date,"YYYY-MM-DD");return React.createElement("div",{className:"event-item-detail"},React.createElement("table",null,React.createElement("tr",null,React.createElement("td",null,"Description"),React.createElement("td",null,a.event)),React.createElement("tr",null,React.createElement("td",null,"Date"),React.createElement("td",null,c.format("ddd, MMM Do"))),React.createElement("tr",null,React.createElement("td",null,"Time"),React.createElement("td",null,a.event_time)),React.createElement("tr",null,React.createElement("td",null,"Channel"),React.createElement("td",null,React.createElement("a",{href:"/#/c/"+a.channel},a.channel))),React.createElement("tr",null,React.createElement("td",null,"Stream"),React.createElement("td",null,React.createElement("a",{href:"/#/c/"+a.channel+"/"+a.stream},a.stream))),React.createElement("tr",null,React.createElement("td",null,"Priority"),React.createElement("td",null,a.priority)),React.createElement("tr",null,React.createElement("td",null,"Link"),React.createElement("td",null,""==a.link?"Unavailable":"",React.createElement("a",{href:""==a.link?"#":"http://"+a.link,className:""==a.link?"hidden":"item-detail-link"},a.link))),React.createElement("tr",null,React.createElement("td",null,"Event Type History"),React.createElement("td",null,"TODO")),React.createElement("tr",null,React.createElement("td",null,"Actions"),React.createElement("td",null,React.createElement("button",null,"Flag"),React.createElement("button",null,"Assign"),React.createElement("button",null,"Dismiss")))))}}),SearchBar=React.createClass({displayName:"SearchBar",handleChange:function(){this.props.onUserInput(this.refs.filterTextInput.getDOMNode().value)},render:function(){return React.createElement("form",{onSubmit:this.handleSubmit,className:"search-box"},React.createElement("input",{type:"text",placeholder:"Search",value:this.props.filterText,ref:"filterTextInput",onChange:this.handleChange}))}}),TimeBox=React.createClass({displayName:"TimeBox",render:function(){return React.createElement("div",{className:"time-options active-time-"+this.props.timeFilter},React.createElement(TimeBoxButton,{thisTime:"shift",handleChangeTime:this.props.handleChangeTime}),React.createElement(TimeBoxButton,{thisTime:"today",handleChangeTime:this.props.handleChangeTime}),React.createElement(TimeBoxButton,{thisTime:"week",handleChangeTime:this.props.handleChangeTime}))}}),TimeBoxButton=React.createClass({displayName:"TimeBoxButton",onChangeTime:function(){this.props.handleChangeTime(this.props.thisTime)},render:function(){return React.createElement("div",{onClick:this.onChangeTime,ref:"changeTimer",className:"time-box-"+this.props.thisTime},React.createElement("span",null,this.props.thisTime))}}),App=React.createClass({displayName:"App",mixins:[Router.State,Navigation],contextTypes:{router:React.PropTypes.func},componentDidMount:function(){Router.HashLocation.addChangeListener(this._onChange),console.log("_onChange 1");var a="https://streamvu-app.appspot.com/stream";$.get(a,function(a){this.isMounted()&&this.setState({events:sortJSON(a)})}.bind(this))},componentWillUnmount:function(){Router.HashLocation.removeChangeListener(this._onChange)},handleItemClick:function(a){console.log("handle item click: "),this.transitionTo(this.state.activePage==a.slug?"/":"/c/"+a.slug)},handleUserInput:function(a){console.log("Handle User Input"),this.setState({filterText:a})},handleChangeTime:function(a){console.log("handleChangeTime"),this.setState({timeFilter:a})},handleDismissItem:function(){console.log("handleDismissItem")},getInitialState:function(){var a="",b="",c="all";return this.context.router.getCurrentParams().channelId&&!this.context.router.getCurrentParams().streamId?(a=this.context.router.getCurrentParams().channelId,c="all",b=this.context.router.getCurrentParams().channelId):this.context.router.getCurrentParams().streamId?(a=this.context.router.getCurrentParams().channelId,b=this.context.router.getCurrentParams().channelId,c=this.context.router.getCurrentParams().streamId):this.context.router.getCurrentParams().eventId?(b="",c="all",a=this.context.router.getCurrentParams().eventId):this.context.router.getCurrentParams().categoryId?(b=this.context.router.getCurrentParams().categoryId,c="all",a=this.context.router.getCurrentParams().categoryId):(b="",c="all",a="home"),{events:[],selectedItem:this.getParams().eventId,activePage:a,activeChannel:b,activeStream:c,filterText:"",timeFilter:"week",user:{dismissed:["2015-04-15-08-00-yyy","2015-04-15-12-00-ddd","2015-04-13-05-15-ppp","abc123"]},categories:[{category:"My Events",slug:"my-events",subs:[{name:"Approval",slug:"approval"},{name:"Flagged",slug:"flagged"}]},{category:"Maintenance",slug:"maintenance",subs:[{name:"Equipment",slug:"equipment"},{name:"Inventory",slug:"inventory"},{name:"Purchasing",slug:"purchasing"},{name:"Work",slug:"work"}]},{category:"Operations",slug:"operations",subs:[{name:"Vessel",slug:"vessel"},{name:"Equipment Forecast",slug:"equipment-forecast"},{name:"Volume",slug:"volume"},{name:"Equipment",slug:"equipment"}]},{category:"Safety",slug:"safety",subs:[{name:"Incident",slug:"incident"},{name:"Environmental",slug:"environmental"},{name:"Public Complaint",slug:"public-complaint"},{name:"Work",slug:"work"}]},{category:"Finance",slug:"finance",subs:[{name:"Forecast",slug:"forecast"},{name:"History",slug:"history"}]}]}},_onChange:function(){console.log("on change"),this.context.router.getCurrentParams().channelId&&!this.context.router.getCurrentParams().streamId?this.setState({activeChannel:this.context.router.getCurrentParams().channelId,activeStream:"all",activePage:this.context.router.getCurrentParams().channelId,filterText:""}):this.context.router.getCurrentParams().streamId?this.setState({activeChannel:this.context.router.getCurrentParams().channelId,activeStream:this.context.router.getCurrentParams().streamId,activePage:this.context.router.getCurrentParams().channelId,filterText:""}):this.context.router.getCurrentParams().eventId?this.setState({activeChannel:"",activeStream:"all",activePage:this.context.router.getCurrentParams().eventId,filterText:""}):this.context.router.getCurrentParams().categoryId?this.setState({activeChannel:this.context.router.getCurrentParams().categoryId,activeStream:"all",activePage:this.context.router.getCurrentParams().categoryId,filterText:""}):(console.log("else"),this.setState({activeChannel:"",activeStream:"all",activePage:"home",filterText:""}))},render:function(){return React.createElement("div",{className:"app-inner activePage-"+this.state.activePage+" activeChannel-"+this.state.activeChannel+" activeStream-"+this.state.activeStream},React.createElement("div",{id:"header"},React.createElement("h1",null,React.createElement("a",{href:"/#/",className:"company-logo"},"Stream|vu")),React.createElement("div",{className:"breadcrumbs"},React.createElement("div",{className:"home"===this.state.activePage?"breadcrumb-item breadcrumb-home":"hidden"},React.createElement("a",{href:"/#/"},"Home")),React.createElement("div",{className:""!==this.state.activeChannel?"breadcrumb-item breadcrumb-channel":"hidden"},React.createElement("a",{href:"#/c/"+this.state.activeChannel},""!==this.state.activeChannel?this.state.activeChannel:"")),React.createElement("div",{className:""!==this.state.activeStream&&"all"!==this.state.activeStream?"breadcrumb-item breadcrumb-stream":"hidden"},React.createElement("a",{href:"#/c/"+this.state.activeChannel+"/"+this.state.activeStream},""!==this.state.activeStream?this.state.activeStream:"")),React.createElement("div",{className:""!==this.state.filterText?"breadcrumb-item breadcrumb-text":"hidden"},React.createElement("a",null,""!==this.state.filterText?this.state.filterText:""))),React.createElement(TimeBox,{timeFilter:this.state.timeFilter,handleChangeTime:this.handleChangeTime}),React.createElement(SearchBar,{filterText:this.state.filterText,onUserInput:this.handleUserInput}),React.createElement("div",{className:"hamburger"},React.createElement("a",{href:"/#/"},React.createElement("svg",{className:"inline-svg",version:"1.1",xmlns:"http://www.w3.org/2000/svg",x:"0px",y:"0px",width:"320px",height:"320px",viewBox:"0 0 32 32","enable-background":"new 0 0 32 32"},React.createElement("g",{className:"svg-menu-toggle"},React.createElement("path",{className:"bar",d:"M20.945,8.75c0,0.69-0.5,1.25-1.117,1.25H3.141c-0.617,0-1.118-0.56-1.118-1.25l0,0 c0-0.69,0.5-1.25,1.118-1.25h16.688C20.445,7.5,20.945,8.06,20.945,8.75L20.945,8.75z"}),React.createElement("path",{className:"bar",d:"M20.923,15c0,0.689-0.501,1.25-1.118,1.25H3.118C2.5,16.25,2,15.689,2,15l0,0c0-0.689,0.5-1.25,1.118-1.25 h16.687C20.422,13.75,20.923,14.311,20.923,15L20.923,15z"}),React.createElement("path",{className:"bar",d:"M20.969,21.25c0,0.689-0.5,1.25-1.117,1.25H3.164c-0.617,0-1.118-0.561-1.118-1.25l0,0 c0-0.689,0.5-1.25,1.118-1.25h16.688C20.469,20,20.969,20.561,20.969,21.25L20.969,21.25z"}),React.createElement("rect",{width:"320",height:"320",fill:"none"})))))),React.createElement(RouteHandler,{events:this.state,onTabClick:this.handleItemClick,onTouchStart:this.handleItemClick,handleChangeTime:this.handleChangeTime,handleDismissItem:this.handleDismissItem}))}}),routes=React.createElement(Route,{name:"home",handler:App,path:"/"},React.createElement(Route,{name:"EventChannelsStreams",path:"c/:channelId/:streamId",handler:CategoryList}),React.createElement(Route,{name:"CategoryItem",path:"c/:categoryId",handler:CategoryList}),React.createElement(Route,{name:"Event",path:"event/:eventId",handler:EventItemDetail}),React.createElement(DefaultRoute,{handler:CategoryList}));Router.run(routes,function(a){React.render(React.createElement(a,null),document.getElementById("app"))});