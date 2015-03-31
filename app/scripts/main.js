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

// React.render(
//   <h1>Stream|vu/h1>, document.getElementById('app')
// ); 




var Dashboard = React.createClass({displayName: "Dashboard", 
  mixins: [Router.State, Navigation],
  render: function() {
    console.log("{this.props.events}!",this.props.events);
    return React.createElement("div", null, 
    React.createElement("h2", null, "this is the dash"), 
    React.createElement(EventList, {events: this.props.events})
      ); 
  }
});

var CategoryList = React.createClass({displayName: "CategoryList", 
  render: function () {
    var categories = ['maintenance','operations'];
    items = categories.map(function(item, index) {
      return (
        React.createElement("div", null, 
        React.createElement("a", {href: "/#/categories/"+item}, item)
        )
        );
    });
    return React.createElement("div", null, items);
  }
});

var CategoryListItem = React.createClass({displayName: "CategoryListItem", 
  contextTypes: {
    router: React.PropTypes.func
  },
  render: function() {
    return React.createElement("div", null, "Category: ",  this.context.router.getCurrentParams().categoryId);
  },
  onClick: function(item) {
    this.props.onTabClick(item);
  },
  onTouchStart: function(item) {
    this.props.onTouchStart(item);
  }
});

var EventList = React.createClass({displayName: "EventList",
  mixins: [Router.State, Navigation],
  handleItemClick: function(item) {
    this.transitionTo('/event/'+item.id); 
  },
  componentDidMount: function () {
    Router.HashLocation.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    Router.HashLocation.removeChangeListener(this._onChange);
  },
  _onChange: function() {
    this.setState({ selectedItem: this.getParams().eventId  });
  },
  render: function () {
    var activeItemClassName = "item-selected item-active-123";
    console.log("this.props.events2:",this.props.events); 
    
    if (this.props.events) {
      var items = this.props.events.events.map(function(item, index) {
        return (
          React.createElement("div", null, 
            React.createElement(EventListItem, {event:  item, 
                onTabClick:  this.handleItemClick, 
                onTouchStart: this.handleItemClick})
          )
          );
      });
    }
    return React.createElement("div", null, items);
  }
});

var EventListItem = React.createClass({displayName: "EventListItem",
  contextTypes: {
    router: React.PropTypes.func
  },
  render: function() {
    if (this.context.router.getCurrentParams().eventId) {
      return React.createElement("div", null, "event id: ", this.context.router.getCurrentParams().eventId)
    } else {
      return (
        React.createElement("div", {key: "{this.props.event.id}"}, 
         this.props.event.id, " -  ", React.createElement("a", {href: "/#/events/"+this.props.event.id},  this.props.event.event), " - ", React.createElement("a", {href: "/#/categories/"+this.props.event.channel},  this.props.event.channel)
        )
      ) 
    }         
  },
  onClick: function(item) {
    this.props.onTabClick(item);
  },
  onTouchStart: function(item) {
    this.props.onTouchStart(item);
  }
  
});

var App = React.createClass({displayName: "App",
  mixins: [Router.State, Navigation],
  handleItemClick: function(item) {
    this.transitionTo('/events/'+item.id); 
  },
  getInitialState: function() {
    return { 
      events: [
        {"id":"1","event_date":"2015-04-13","event_time":"05:15","stream_date":"2015-04-13","stream_time":"07:15","channel":"maintenance","stream":"equipment","priority":"med","event":"3514 out of service","link":"m.ax/df87"},
        {"id":"2","event_date":"2015-04-13","event_time":"07:15","stream_date":"2015-04-13","stream_time":"07:45","channel":"operations","stream":"forecast","priority":"high","event":"30's shortage forecast today","link":"m.ax/z74y"},
        {"id":"3","event_date":"2015-04-13","event_time":"07:15","stream_date":"2015-04-13","stream_time":"07:50","channel":"maintenance","stream":"equipment","priority":"medium","event":"3512 out of service","link":"m.ax/s74t"},
        {"id":"4","event_date":"2015-04-13","event_time":"07:20","stream_date":"2015-04-13","stream_time":"07:50","channel":"maintenance","stream":"equipment","priority":"medium","event":"3510 out of service","link":"m.ax/bd4y"},
        {"id":"5","event_date":"2015-04-13","event_time":"08:00","stream_date":"2015-04-13","stream_time":"08:00","channel":"operations","stream":"forecast","priority":"high","event":"RS shortage forecast today","link":"m.ax/kj8l"},
        {"id":"6","event_date":"2015-04-13","event_time":"09:10","stream_date":"2015-04-13","stream_time":"09:12","channel":"operations","stream":"equipment","priority":"high","event":"RS10 returned to service","link":"m.ax/d9ij"},
        {"id":"7","event_date":"2015-04-13","event_time":"08:00","stream_date":"2015-04-13","stream_time":"09:15","channel":"maintenance","stream":"equipment","priority":"high","event":"RS11 out of service","link":"m.ax/4ftf"},
        {"id":"8","event_date":"2015-04-13","event_time":"09:20","stream_date":"2015-04-13","stream_time":"09:35","channel":"operations","stream":"vessel","priority":"low","event":"MV Swift delayed 11/9/14","link":"m.ax/s7fd"},
        {"id":"9","event_date":"2015-04-13","event_time":"10:35","stream_date":"2015-04-13","stream_time":"10:45","channel":"operations","stream":"vessel","priority":"medium","event":"MV Taylor early 11/5/14","link":"m.ax/d90t"},
        {"id":"10","event_date":"2015-04-13","event_time":"11:15","stream_date":"2015-04-13","stream_time":"11:15","channel":"operations","stream":"equipment","priority":"medium","event":"3514 back in service","link":"m.ax/bd4y"},
        {"id":"11","event_date":"2015-04-13","event_time":"14:10","stream_date":"2015-04-13","stream_time":"14:10","channel":"operations","stream":"equipment","priority":"high","event":"RS11 back in service","link":"m.ax/4ftf"},
        {"id":"12","event_date":"2015-04-13","event_time":"14:20","stream_date":"2015-04-13","stream_time":"14:20","channel":"operations","stream":"equipment","priority":"medium","event":"3512 back in service","link":"m.ax/bd4y"},
        {"id":"13","event_date":"2015-04-13","event_time":"14:25","stream_date":"2015-04-13","stream_time":"14:25","channel":"operations","stream":"equipment","priority":"medium","event":"3510 back in service","link":"m.ax/bd4y"},
        {"id":"14","event_date":"2015-04-14","event_time":"06:18","stream_date":"2015-04-14","stream_time":"07:30","channel":"maintenance","stream":"equipment","priority":"high","event":"RS10 out of service, 1 day of uptime","link":"m.ax/b74y"},
        {"id":"15","event_date":"2015-04-14","event_time":"08:00","stream_date":"2015-04-14","stream_time":"08:00","channel":"maintenance","stream":"work","priority":"medium","event":"PM compliance below target","link":"m.ax/d87w"},
        {"id":"16","event_date":"2015-04-14","event_time":"10:45","stream_date":"2015-04-14","stream_time":"11:30","channel":"maintenance","stream":"equipment","priority":"high","event":"RS04 out of service","link":"m.ax/b74y"},
        {"id":"17","event_date":"2015-04-14","event_time":"12:00","stream_date":"2015-04-14","stream_time":"12:00","channel":"operations","stream":"equipment","priority":"high","event":"RS shortage forecast tomorrow","link":"m.ax/kj8l"},
        {"id":"18","event_date":"2015-04-14","event_time":"12:34","stream_date":"2015-04-14","stream_time":"12:50","channel":"maintenance","stream":"equipment","priority":"medium","event":"3517 out of service","link":"m.ax/4ftf"},
        {"id":"19","event_date":"2015-04-14","event_time":"14:12","stream_date":"2015-04-14","stream_time":"14:12","channel":"operations","stream":"vessel","priority":"medium","event":"MV Susanne early 11/4/14","link":"m.ax/39aq"},
        {"id":"20","event_date":"2015-04-14","event_time":"14:15","stream_date":"2015-04-14","stream_time":"14:15","channel":"operations","stream":"equipment","priority":"high","event":"RS04 return to service","link":"m.ax/d9ij"},
        {"id":"21","event_date":"2015-04-14","event_time":"14:50","stream_date":"2015-04-14","stream_time":"14:50","channel":"operations","stream":"vessel","priority":"low","event":"MV Sky Dream delayed 11/7/14","link":"m.ax/s7fd"},
        {"id":"22","event_date":"2015-04-14","event_time":"15:05","stream_date":"2015-04-14","stream_time":"15:10","channel":"operations","stream":"vessel","priority":"medium","event":"MV Ocean Sky early 11/5/14","link":"m.ax/d90t"},
        {"id":"23","event_date":"2015-04-14","event_time":"16:10","stream_date":"2015-04-14","stream_time":"16:10","channel":"maintenance","stream":"work","priority":"low","event":"wo budget exceeded","link":"m.ax/v0kj"},
        {"id":"24","event_date":"2015-04-15","event_time":"09:12","stream_date":"2015-04-15","stream_time":"09:12","channel":"operations","stream":"vessel","priority":"medium","event":"MV Graul early 11/4/14","link":"m.ax/45rf"},
        {"id":"25","event_date":"2015-04-15","event_time":"10:10","stream_date":"2015-04-15","stream_time":"10:10","channel":"operations","stream":"vessel","priority":"low","event":"MV Dancer delayed 11/12/14","link":"m.ax/87dsa"},
        {"id":"26","event_date":"2015-04-15","event_time":"10:45","stream_date":"2015-04-15","stream_time":"10:45","channel":"operations","stream":"equipment","priority":"high","event":"RS08 return to service","link":"m.ax/34de"},
        {"id":"27","event_date":"2015-04-15","event_time":"10:15","stream_date":"2015-04-15","stream_time":"10:52","channel":"maintenance","stream":"equipment","priority":"high","event":"RS08 out of service","link":"m.ax/d87sa"}
      ],
      selectedItem: this.getParams().eventId
    };
  },
  componentDidMount: function () {
    Router.HashLocation.addChangeListener(this._onChange);
  },
  componentWillUnmount: function() {
    Router.HashLocation.removeChangeListener(this._onChange);
  },
  _onChange: function() {
    this.setState({ selectedItem: this.getParams().eventId  });
  },
  render: function () {
    var activeItemClassName = "item-selected item-active-" + this.state.selectedItem;
    return (
      React.createElement("div", null, 
        React.createElement(RouteHandler, {events: this.state})
      )
    );
  }
});


var routes = (
  React.createElement(Route, {handler: App, path: "/"}, 
    React.createElement(Route, {name: "categoryItem", path: "categories/:categoryId", handler: CategoryListItem}), 
    React.createElement(Route, {name: "categories", path: "categories", handler: CategoryList}), 
    React.createElement(Route, {name: "eventItem", path: "events", handler: EventList}), 
    React.createElement(Route, {name: "event", path: "events/:eventId", handler: EventListItem}), 
    React.createElement(DefaultRoute, {handler: Dashboard})
  ) 
); 



Router.run(routes, function (Handler, state) {
  React.render(React.createElement(Handler, null), document.getElementById('app')); 
});


