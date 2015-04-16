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
  // console.log('slugify: TODO: do this on the server!');
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
function sortJSON(obj) {
  return obj.sort(function(a,b) { console.log('sorting...');return b.id.localeCompare(a.id) } );
}






/****** COMPONENTS *********/

var EventListDate = React.createClass({
  render: function() {
    console.log('date here');
    var day = moment(this.props.date, "YYYY-MM-DD"); 
    return (<div className="event-list-date-row">{ day.format('ddd, MMM Do') }</div>);
  }
});

var CategoryList = React.createClass({ 
  render: function () {
    var activeStream = this.props.events.activeStream;
    var items = this.props.events.categories.map(function(item, index) {
      // Temp: TODO calculate this server side
      
      // var prioritiesHigh = Math.floor(Math.random() * (9 - 2 + 1)) + 2;
      var prioritiesHigh = 2;
      var prioritiesLow = 12;
      
      // var prioritiesLow = [];
      // var prioritiesHigh = [];
      // var alerts = this.props.events.events.map(function(event) {
      //   console.log('map events for alerts');
      //   if ((event.channel == item.slug) && event.priority == "low") {
      //     prioritiesLow.push(event);
      //   } else if (event.channel == item.slug && event.priority == "high") {
      //     prioritiesHigh.push(event);
      //   }
      // }.bind(this));
      return (
        <div className={"category-list-item category-list-" + item.slug} key={index} onClick={this.onClick.bind(this, item)} onTouchStart={this.onTouchStart.bind(this, item)}>

          <div className="category-alerts">
            <div className={ prioritiesLow > 0 ? 'category-alert category-alert-low' : 'hidden' }>{ prioritiesLow }</div>
            <div className={ prioritiesHigh > 0 ? 'category-alert category-alert-high' : 'hidden' }>{ prioritiesHigh }</div>
          </div>
    
          <div className="category-title">
            <h2>
              { item.category }
            </h2>
          </div>
          
          {/*  item.subs.length ? <SubCategoryList category={ item } activeStream={ this.props.events.activeStream } subs={ item.subs } />  : ''  */}
          
          <div className="events-inline">
            <EventList events={ this.props.events } user={ this.props.events.user } />
          </div>
          
        </div> 
      );
    }.bind(this));
    return <div className="category-list">{items}</div>;
  },
  onClick: function(item) {
    // console.log('click');
    this.props.onTabClick(item);
  },
  onTouchStart: function(item) {
    // console.log('touch');
    this.props.onTouchStart(item); 
  }
});

/*
var SubCategoryList = React.createClass({ 
  render: function () {
    var cat = this.props.category;
    var activeStream = this.props.activeStream;
    var items = this.props.subs.map(function(item, index) {
      return (
        <div className={item.slug==activeStream ? 'sub-category-list-item sub-category-active' : 'sub-category-list-item' } key={index}>
          <a href={ "/#/c/" + cat.slug + "/" + item.slug }>{item.name}</a>
        </div>
      );
    });
    return <div className="sub-category-list">
      <div className={activeStream=='all' ? 'sub-category-list-item sub-category-active' : 'sub-category-list-item'}><a href={"/#/c/" + cat.slug }>All</a></div>
      {items}
    </div>;
  }
});
*/

var EventList = React.createClass({
  render: function () {
    if (this.props.events) {
      var rows = [];
      var lastCategory = null;
      this.props.events.events.forEach(function(event, index) {
        // if (this.props.events.activeChannel !== '') {
        //   if (event.channel.toLowerCase().indexOf(this.props.events.activeChannel) === -1) {
        //     return;
        //   }
        // }
        // if (this.props.events.activeStream !== '' && this.props.events.activeStream !== 'all') {
        //   if (event.stream.toLowerCase().indexOf(this.props.events.activeStream) === -1) {
        //     return;
        //   }
        // }
        // if (event.event.toLowerCase().indexOf(this.props.events.filterText) === -1) {
        //     return;
        // }
        // if (event.event_date !== lastCategory) {
        //   rows.push(<EventListDate date={event.event_date} key={ index + randomStr(5) } />);
        // }
        rows.push(<EventListItem event={event} user={this.props.user} key={ event.id } />); 
        lastCategory = event.event_date; 
      }.bind(this)); 
    }
    return <div className="event-list">{rows}</div>;
        
  }
});

var EventListItem = React.createClass({
  mixins: [Router.State, Navigation],
  contextTypes: {
    router: React.PropTypes.func
  },
  getEventDetail: function(e) {
    // this.props.handleEventDetail(this.props.thisTime);
    // console.log('get event');
    // {"/#/event/"+this.props.event.id}
    e.stopPropagation();
    e.preventDefault();
    this.transitionTo("/event/"+this.props.event.id); 
  },
  render: function() {
    var dismissed = false;
    if ( this.props.user.dismissed.indexOf(this.props.event.id) > -1 ) {
      dismissed = true;
    }
    return (
//        <div>event!!</div>
        <div id={ 'id-' + this.props.event.id } key={ 'id-' + this.props.event.id } className={ dismissed==true ? 'event-dismissed event-list-item item-priority-' + this.props.event.priority : 'event-list-item item-priority-' + this.props.event.priority }>
          <div className="event-time">{ this.props.event.event_time }</div>
          <div className="event-item-column event-title">
            <div className="event-item-priority-indicator"></div>
            <a href={"/#/event/"+this.props.event.id} onClick={ this.getEventDetail }>{ this.props.event.event }</a>
          </div>
          {/* 
          <div className="event-item-actions">
            <div className="event-action event-item-flag">
              <span>{ this.props.event.priority == 'high' ? 'Unflag' : 'Flag' }</span>
            </div>
            <div className="event-action event-item-discuss">
              <span>Assign</span>
            </div>
            <div className="event-action event-item-ok">
              <span>{ dismissed==true ? 'Undismiss' : 'Dismiss' }</span>
            </div>
          </div>
          */}
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
              <td>{ item.link == '' ? 'Unavailable' : '' }<a href={ item.link == '' ? '#' : 'http://' + item.link } className={ item.link == '' ? 'hidden' : 'item-detail-link' }>{ item.link }</a></td>
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
  componentDidMount: function () {
    Router.HashLocation.addChangeListener(this._onChange);
    console.log('_onChange 1');
    var server = 'https://streamvu-app.appspot.com/stream';
    var local = 'http://localhost:17096/stream';
    $.get(server, function(result) {
      if (this.isMounted()) {
        this.setState({
          events: sortJSON(result), 
        });
      }
    }.bind(this));
  },
  componentWillUnmount: function() {
    Router.HashLocation.removeChangeListener(this._onChange);
  },
  handleItemClick: function(item) {
    console.log('handle item click: ');
    if (this.state.activePage == item.slug ) {
      this.transitionTo('/'); 
    } else {
      this.transitionTo('/c/' + item.slug ); 
    }
  },
  handleUserInput: function(filterText) {
    console.log('Handle User Input');
    this.setState({
      filterText: filterText
    });
  },
  handleChangeTime: function(newTime) {
    console.log('handleChangeTime');
    this.setState({
      timeFilter: newTime
    });
  },
  handleDismissItem: function(newTime) {
    console.log('handleDismissItem');
    // this.setState({
    //   user.dismiss: user.dismiss.append('hola')
    // });
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
      events: [],
      selectedItem: this.getParams().eventId,
      activePage: activePage,
      activeChannel: activeChannel,
      activeStream: activeStream,
      filterText: '',
      timeFilter: 'week',
      user: {"dismissed":['2015-04-15-08-00-yyy','2015-04-15-12-00-ddd','2015-04-13-05-15-ppp','abc123'] },
      categories: [
        {'category':'My Events','slug':'my-events',
          'subs':[
            {'name':'Approval','slug':'approval'},
            {'name':'Flagged','slug':'flagged'}
          ]
        },
        {'category':'Maintenance','slug':'maintenance',
          'subs':[
            {'name':'Equipment','slug':'equipment'},
            {'name':'Inventory','slug':'inventory'},
            {'name':'Purchasing','slug':'purchasing'},
            {'name':'Work','slug':'work'}
          ]
        },
        {'category':'Operations','slug':'operations',
          'subs':[
            {'name':'Vessel','slug':'vessel'},
            {'name':'Equipment Forecast','slug':'equipment-forecast'},
            {'name':'Volume','slug':'volume'},
            {'name':'Equipment','slug':'equipment'}
          ]
        },
        {'category':'Safety','slug':'safety',
          'subs':[
            {'name':'Incident','slug':'incident'},
            {'name':'Environmental','slug':'environmental'},
            {'name':'Public Complaint','slug':'public-complaint'},
            {'name':'Work','slug':'work'}
          ]
        },
        {'category':'Finance','slug':'finance',
          'subs':[
            {'name':'Forecast','slug':'forecast'},
            {'name':'History','slug':'history'}
          ]
        }
      ]
    };
  },
  _onChange: function() {
    console.log('on change');
    if (this.context.router.getCurrentParams().channelId && !this.context.router.getCurrentParams().streamId) {
      this.setState({ 
        activeChannel: this.context.router.getCurrentParams().channelId,
        activeStream: 'all',
        activePage: this.context.router.getCurrentParams().channelId,
        filterText: ''
      }); 
    } else if (this.context.router.getCurrentParams().streamId) {
      this.setState({ 
        activeChannel: this.context.router.getCurrentParams().channelId,
        activeStream: this.context.router.getCurrentParams().streamId,
        activePage: this.context.router.getCurrentParams().channelId,
        filterText: ''
      });
    } else if (this.context.router.getCurrentParams().eventId) {
      this.setState({ 
        activeChannel: '',
        activeStream: 'all',
        activePage: this.context.router.getCurrentParams().eventId,
        filterText: '' 
      }); 
    } else if (this.context.router.getCurrentParams().categoryId) {
      this.setState({ 
        activeChannel: this.context.router.getCurrentParams().categoryId,
        activeStream: 'all',
        activePage: this.context.router.getCurrentParams().categoryId,
        filterText: '' 
      }); 
    } else {
      console.log('else');
      this.setState({ 
        activeChannel: '',
        activeStream: 'all',
        activePage: "home",
        filterText: '' 
      }); 
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
                      handleChangeTime={this.handleChangeTime}
                      handleDismissItem={this.handleDismissItem} />
      </div>
    );
  }
});


/****** ROUTES *********/

var routes = (
  <Route name="home" handler={App} path="/">
    <Route name="EventChannelsStreams" path="c/:channelId/:streamId" handler={CategoryList} />
    <Route name="CategoryItem" path="c/:categoryId" handler={CategoryList} /> 
    <Route name="Event" path="event/:eventId" handler={EventItemDetail} />
    <DefaultRoute handler={CategoryList}/>
  </Route> 
); 

Router.run(routes, function (Handler, state) {
  React.render(<Handler />, document.getElementById('app')); 
});


