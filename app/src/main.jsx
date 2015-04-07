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

/****** COMPONENTS *********/

var EventListDate = React.createClass({
  render: function() {
    var day = moment(this.props.date, "YYYY-MM-DD");
    return (<div className="event-list-date-row">{ day.format('ddd, MMM Do') }</div>);
  }
});

var CategoryList = React.createClass({ 
  render: function () {
    var items = this.props.events.categories.map(function(item, index) {
      var subs = [];
      var subs_array = item.subs.map(function(sub) {
        subs.push(sub);
      }.bind(this));
      
      var prioritiesLow = [];
      var prioritiesMed = [];
      var prioritiesHigh = [];
      var alerts = this.props.events.events.map(function(event) {
        if (event.channel.toLowerCase() == item.category.toLowerCase() && event.priority == "low") {
          prioritiesLow.push(event);
        } else if (event.channel.toLowerCase() == item.category.toLowerCase() && event.priority == "med") {
          prioritiesMed.push(event);
        } else if (event.channel.toLowerCase() == item.category.toLowerCase() && event.priority == "high") {
          prioritiesHigh.push(event);
        }
      }.bind(this));
      
      return (
        <div className={"category-list-item category-list-" + item.category.toLowerCase()} key={index} onClick={this.onClick.bind(this, item)} onTouchStart={this.onTouchStart.bind(this, item)}>

          <div className="category-alerts">
            <div className="category-alert category-alert-low">{ prioritiesLow.length }</div>
            <div className="category-alert category-alert-med">{ prioritiesMed.length }</div>
            <div className="category-alert category-alert-high">{ prioritiesHigh.length }</div>
          </div>
    
          <div className="category-title">
            <h2>
              { item.category }
            </h2>
          </div>
          
          { subs.length ? <SubCategoryList category={ item.category.toLowerCase() } subs={ subs } />  : '' }
          
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
    var items = this.props.subs.map(function(item, index) {
      return (
        <div className="sub-category-list-item" key={index}>
          <a href={ "/#/events/" + cat + "/" + item.toLowerCase() }>{item}</a>
        </div>
      );
    });
    return <div className="sub-category-list">
              <div className="sub-category-list-item"><a href={"/#/events/"+cat}>All</a></div>
              {items}
           </div>;
  }
});

var EventList = React.createClass({
  render: function () {
    if (this.props.events) {
      var rows = [];
      var lastCategory = null;
      // console.log('activeStream',this.props.events.activeStream);
      this.props.events.events.forEach(function(event, index) {
        if (this.props.events.activeChannel !== '') {
          if (event.channel.toLowerCase().indexOf(this.props.events.activeChannel.toLowerCase()) === -1) {
            return;
          }
        }
        if (this.props.events.activeStream !== '') {
          if (event.stream.toLowerCase().indexOf(this.props.events.activeStream.toLowerCase()) === -1) {
            return;
          }
        }
        if (event.event.toLowerCase().indexOf(this.props.events.filterText.toLowerCase()) === -1) {
            return;
        }
        if (event.event_date !== lastCategory) {
          rows.push(<EventListDate date={event.event_date} key={ "date-" + event.id } />);
        }
        rows.push(<EventListItem event={event} key={event.id} />);
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
    if (this.context.router.getCurrentParams().eventId) {
      return <div className="event-item-single">Event id: {this.context.router.getCurrentParams().eventId}</div>
    } else {
      return (
        <div key="{this.props.event.id}" className={ 'event-list-item item-priority-' + this.props.event.priority }>
          <div className="event-time">{ this.props.event.event_time }</div>
          <div className="event-item-column event-title"><a href={"/#/events/"+this.props.event.id}>{ this.props.event.event }</a> - channel: { this.props.event.channel } - stream: { this.props.event.stream } </div>
        </div>
      ) 
    }         
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

var App = React.createClass({
  mixins: [Router.State, Navigation],
  contextTypes: {
    router: React.PropTypes.func
  },
  handleItemClick: function(item) {
    this.transitionTo('/c/'+item.category.toLowerCase()); 
  },
  handleUserInput: function(filterText) {
      this.setState({
          filterText: filterText
      });
      // console.log('filterText',filterText);
  },
  getInitialState: function() {
    var activePage = '';
    var activeChannel = '';
    var activeStream = '';

    if (this.context.router.getCurrentParams().channelId && !this.context.router.getCurrentParams().streamId) {
      activePage = 'events';
      activeStream = '';
      activeChannel = this.context.router.getCurrentParams().channelId; 
    } else if (this.context.router.getCurrentParams().streamId) {
      activePage = 'events';
      activeChannel = this.context.router.getCurrentParams().channelId;
      activeStream = this.context.router.getCurrentParams().streamId; 
      console.log('is stream');
    } else if (this.context.router.getCurrentParams().eventId) {
      activeChannel = '';
      activeStream = '';
      activePage = this.context.router.getCurrentParams().eventId; 
    } else if (this.context.router.getCurrentParams().categoryId) {
      activeChannel = '';
      activeStream = '';
      activePage = this.context.router.getCurrentParams().categoryId; 
    } else {
      activeChannel = '';
      activeStream = '';
      activePage = "home"; 
    }
    console.log('activeStream',activeStream);
    console.log('activeChannel',activePage);
    console.log('activePage',activePage);
    return { 
      events: [
        {"id":"27","event_date":"2015-04-15","event_time":"10:15","stream_date":"2015-04-15","stream_time":"10:52","channel":"maintenance","stream":"equipment","priority":"high","event":"RS08 out of service","link":"m.ax/d87sa"},
        {"id":"26","event_date":"2015-04-15","event_time":"10:45","stream_date":"2015-04-15","stream_time":"10:45","channel":"operations","stream":"equipment","priority":"high","event":"RS08 return to service","link":"m.ax/34de"},
        {"id":"25","event_date":"2015-04-15","event_time":"10:10","stream_date":"2015-04-15","stream_time":"10:10","channel":"operations","stream":"vessel","priority":"low","event":"MV Dancer delayed 11/12/14","link":"m.ax/87dsa"},
        {"id":"24","event_date":"2015-04-15","event_time":"09:12","stream_date":"2015-04-15","stream_time":"09:12","channel":"operations","stream":"vessel","priority":"med","event":"MV Graul early 11/4/14","link":"m.ax/45rf"},
        {"id":"23","event_date":"2015-04-14","event_time":"16:10","stream_date":"2015-04-14","stream_time":"16:10","channel":"maintenance","stream":"work","priority":"low","event":"wo budget exceeded","link":"m.ax/v0kj"},
        {"id":"22","event_date":"2015-04-14","event_time":"15:05","stream_date":"2015-04-14","stream_time":"15:10","channel":"operations","stream":"vessel","priority":"med","event":"MV Ocean Sky early 11/5/14","link":"m.ax/d90t"},
        {"id":"21","event_date":"2015-04-14","event_time":"14:50","stream_date":"2015-04-14","stream_time":"14:50","channel":"operations","stream":"vessel","priority":"low","event":"MV Sky Dream delayed 11/7/14","link":"m.ax/s7fd"},
        {"id":"20","event_date":"2015-04-14","event_time":"14:15","stream_date":"2015-04-14","stream_time":"14:15","channel":"operations","stream":"equipment","priority":"high","event":"RS04 return to service","link":"m.ax/d9ij"},
        {"id":"18","event_date":"2015-04-14","event_time":"12:34","stream_date":"2015-04-14","stream_time":"12:50","channel":"maintenance","stream":"equipment","priority":"med","event":"3517 out of service","link":"m.ax/4ftf"},
        {"id":"17","event_date":"2015-04-14","event_time":"12:00","stream_date":"2015-04-14","stream_time":"12:00","channel":"operations","stream":"equipment","priority":"high","event":"RS shortage forecast tomorrow","link":"m.ax/kj8l"},
        {"id":"16","event_date":"2015-04-14","event_time":"10:45","stream_date":"2015-04-14","stream_time":"11:30","channel":"maintenance","stream":"equipment","priority":"high","event":"RS04 out of service","link":"m.ax/b74y"},
        {"id":"15","event_date":"2015-04-14","event_time":"08:00","stream_date":"2015-04-14","stream_time":"08:00","channel":"maintenance","stream":"work","priority":"med","event":"PM compliance below target","link":"m.ax/d87w"},
        {"id":"14","event_date":"2015-04-14","event_time":"06:18","stream_date":"2015-04-14","stream_time":"07:30","channel":"maintenance","stream":"equipment","priority":"high","event":"RS10 out of service, 1 day of uptime","link":"m.ax/b74y"},
        {"id":"13","event_date":"2015-04-13","event_time":"14:25","stream_date":"2015-04-13","stream_time":"14:25","channel":"operations","stream":"equipment","priority":"med","event":"3510 back in service","link":"m.ax/bd4y"},
        {"id":"12","event_date":"2015-04-13","event_time":"14:20","stream_date":"2015-04-13","stream_time":"14:20","channel":"operations","stream":"equipment","priority":"med","event":"3512 back in service","link":"m.ax/bd4y"},
        {"id":"11","event_date":"2015-04-13","event_time":"14:10","stream_date":"2015-04-13","stream_time":"14:10","channel":"operations","stream":"equipment","priority":"high","event":"RS11 back in service","link":"m.ax/4ftf"},
        {"id":"10","event_date":"2015-04-13","event_time":"11:15","stream_date":"2015-04-13","stream_time":"11:15","channel":"operations","stream":"equipment","priority":"med","event":"3514 back in service","link":"m.ax/bd4y"},
        {"id":"9","event_date":"2015-04-13","event_time":"10:35","stream_date":"2015-04-13","stream_time":"10:45","channel":"operations","stream":"vessel","priority":"med","event":"MV Taylor early 11/5/14","link":"m.ax/d90t"},
        {"id":"8","event_date":"2015-04-13","event_time":"09:20","stream_date":"2015-04-13","stream_time":"09:35","channel":"operations","stream":"vessel","priority":"low","event":"MV Swift delayed 11/9/14","link":"m.ax/s7fd"},
        {"id":"7","event_date":"2015-04-13","event_time":"08:00","stream_date":"2015-04-13","stream_time":"09:15","channel":"maintenance","stream":"equipment","priority":"high","event":"RS11 out of service","link":"m.ax/4ftf"},
        {"id":"6","event_date":"2015-04-13","event_time":"09:10","stream_date":"2015-04-13","stream_time":"09:12","channel":"operations","stream":"equipment","priority":"high","event":"RS10 returned to service","link":"m.ax/d9ij"},
        {"id":"5","event_date":"2015-04-13","event_time":"08:00","stream_date":"2015-04-13","stream_time":"08:00","channel":"operations","stream":"forecast","priority":"high","event":"RS shortage forecast today","link":"m.ax/kj8l"},
        {"id":"4","event_date":"2015-04-13","event_time":"07:20","stream_date":"2015-04-13","stream_time":"07:50","channel":"maintenance","stream":"equipment","priority":"med","event":"3510 out of service","link":"m.ax/bd4y"},
        {"id":"3","event_date":"2015-04-13","event_time":"07:15","stream_date":"2015-04-13","stream_time":"07:50","channel":"maintenance","stream":"equipment","priority":"med","event":"3512 out of service","link":"m.ax/s74t"},
        {"id":"2","event_date":"2015-04-13","event_time":"07:15","stream_date":"2015-04-13","stream_time":"07:45","channel":"operations","stream":"forecast","priority":"high","event":"30's shortage forecast today","link":"m.ax/z74y"},
        {"id":"1","event_date":"2015-04-13","event_time":"05:15","stream_date":"2015-04-13","stream_time":"07:15","channel":"maintenance","stream":"equipment","priority":"med","event":"3514 out of service","link":"m.ax/df87"}
      ],
      selectedItem: this.getParams().eventId,
      activePage: activePage,
      activeChannel: activeChannel,
      activeStream: activeStream,
      filterText: '',
      categories: [{'category':'Maintenance','subs':['Equipment','Work']},{'category':'Operations','subs':['Vessel','Forecast']},{'category':'Safety','subs':['Records','Audits','Events']},{'category':'HR','subs':['Hiring','Vacations','Sick']}]
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
      this.setState({ activeStream: '' });
    } else if (this.context.router.getCurrentParams().streamId) {
      this.setState({ activeChannel: this.context.router.getCurrentParams().channelId });
      this.setState({ activeStream: this.context.router.getCurrentParams().streamId }); 
    } else if (this.context.router.getCurrentParams().eventId) {
      this.setState({ activeChannel: '' });
      this.setState({ activeStream: '' }); 
      this.setState({ activePage: this.context.router.getCurrentParams().eventId }); 
    } else if (this.context.router.getCurrentParams().categoryId) {
      this.setState({ activeChannel: '' });
      this.setState({ activeStream: '' }); 
      this.setState({ activePage: this.context.router.getCurrentParams().categoryId }); 
    } else {
      this.setState({ activeChannel: '' });
      this.setState({ activeStream: '' }); 
      this.setState({ activePage: "home" }); 
    }
  },
  render: function () {
    return (
      <div className={ "activePage-" + this.state.activePage }>
        <div id="header">
          {/* }<div className="hamburger"><a href="/" className="btn">Home</a><span>{ activePageBreadCrumb }</span></div> */}

          <h1><a href="/#/" className="company-logo">Stream|vu</a></h1>

          <div className="breadcrumbs">
            <div className="breadcrumb-item breadcrumb-home"><a href="/#/">Home</a></div>
            <div className={ this.state.activeChannel !=='' ? 'breadcrumb-item breadcrumb-channel' : 'hidden' }><a href={"#/events/" + this.state.activeChannel }>{ this.state.activeChannel !=='' ? this.state.activeChannel : '' }</a></div>
            <div className={ this.state.activeStream !=='' ? 'breadcrumb-item breadcrumb-stream' : 'hidden' }><a href={"#/events/" + this.state.activeChannel + "/" + this.state.activeStream }>{ this.state.activeStream !=='' ? this.state.activeStream : '' }</a></div>
            <div className={ this.state.filterText !=='' ? 'breadcrumb-item breadcrumb-text' : 'hidden' }><a>{ this.state.filterText !=='' ? this.state.filterText : '' }</a></div>
          </div>
          
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
                        {/* needs to be here as a hit area */}
                        <rect width="320" height="320" fill="none"></rect>
            					</g>
            		</svg>
              </a>
          </div>
          
          {/* <div className="search-box"><input type="text" placeholder="Search..." /></div> */}
                      
        </div>
        
        <RouteHandler events={this.state} 
                      onTabClick={ this.handleItemClick }
                      onTouchStart={this.handleItemClick} />
      </div>
    );
  }
});


/****** ROUTES *********/

var routes = (
  <Route name="home" handler={App} path="/">
    <Route name="categoryItem" path="c/:categoryId" handler={CategoryList} /> 
    <Route name="categories" path="categories" handler={CategoryList} /> 
    <Route name="events" path="events" handler={EventList} />
    <Route name="eventChannelStream" path="events/:channelId/:streamId" handler={EventList} />
    <Route name="eventItem" path="events/:channelId" handler={EventList} />
    <DefaultRoute handler={CategoryList}/>
  </Route> 
); 

Router.run(routes, function (Handler, state) {
  React.render(<Handler />, document.getElementById('app')); 
});


