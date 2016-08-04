import React from 'react';

export default class Header extends React.Component {
      constructor(props) {
            super(props)
      }

      render() {
            return (
             <div className="navbar navbar-inverse navbar-fixed-top" role="navigation">
                   <div className="container-fluid">
                         <div className="navbar-header">
                               <button type="button" className="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                               <span className="sr-only">Toggle navigation</span>
                               <span className="icon-bar"></span>
                               <span className="icon-bar"></span>
                               <span className="icon-bar"></span>
                               </button>
                         </div>
                         <div className="navbar-collapse collapse">
                               <ul className="nav navbar-nav navbar-left">
                               <li><a href="#">Home</a></li>
                               </ul>
                         </div>
                   </div>
             </div>
             )
      }
}