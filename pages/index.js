import React, { useState, useEffect, Component } from 'react';
import InfiniteScroll from 'react-bidirectional-infinite-scroll';
import {fetchApiUsers} from '../services/api';
import './css/index.css';

const Home = () => {

    const [numPage, setNumPage] = useState(1);
    const [listUsersData, setListUsersData] = useState([]);
    const [listUsersUIHorizontal, setListUsersUIHorizontal] = useState([]);
    const [listUsersUIVertical, setListUsersUIVertical] = useState([]);

    useEffect(() => {
        fetchApiUsers()
        .then(data => {
            let currentListUsersData = listUsersData;
            if (listUsersData.length == 0) {
                currentListUsersData = data.results.slice(0,10);
                setListUsersData(currentListUsersData);
                setNumPage(1);
            }
            setListUsersUIHorizontal(loadUsersComponentHorizontal(currentListUsersData));
            // setListUsersUIVertical(loadUsersComponentVertical(currentListUsersData));
        })
    }, [])

    const loadUsersComponentHorizontal = (data) => {
        return (
            <>
                {data.map(item => (
                    <div
                      className="row p-4 h-100"
                      style={{
                        width: '350px',
                        height: 'auto',
                        display: 'inline-block',
                        backgroundColor: (item.dob.age < 21) ? 'red' : ((item.dob.age >= 21 && item.dob.age < 56) ? 'green' : 'blue'),
                        marginRight: '50px'}}>
                          <div className="col-12 text-center mb-3" style={{'overflow-x':'scroll'}}>
                              <img src={item.picture.large} style={{width:'150px'}} />
                          </div>
                          <div className="col-12" style={{'overflow-x':'scroll'}}>
                              {item.name.title}{' '}{item.name.first}{' '}{item.name.last}
                          </div>
                          <div className="col-12 mb-3" style={{'overflow-x':'scroll'}}>
                              Age : {item.dob.age}
                          </div>
                          <div className="col-12 mb-3" style={{'overflow-x':'scroll'}}>
                              Location : {item.location.city}{', '}{item.location.state}{', '}{item.location.postcode}
                          </div>
                          <div className="col-12" style={{'overflow-x':'scroll'}}>
                              Email : {item.email}
                          </div>
                    </div>
                ))}
            </>
        )
    }

    const loadUsersComponentVertical = (data) => {

    }

    const loadMoreUsersHorizontal = () => {
        alert("TEST JALAN");
    }

    return (
        <div className="container">
            <div className="row" style={{height:'100vh'}}>
                <div className="col-12 align-self-start">
                    <div className="row align-items-center">
                        <div className="col-6 text-left">
                            <h1>Qoala Test</h1>
                        </div>
                        <div className="col-6 text-right">
                            <button>Color</button>
                            &nbsp;&nbsp;&nbsp;
                            <button>Cities</button>
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <div className="d-none d-lg-block">
                        <div
                          style={{
                            width: '100%',
                            height: 'auto',
                            WebkitOverflowScrolling: 'touch'
                          }}>
                            <InfiniteScroll onReachRight={loadMoreUsersHorizontal} horizontal>
                                {listUsersUIHorizontal}
                            </InfiniteScroll>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}



// class Home extends Component {
//
//     constructor(props) {
//         super(props);
//         this.state = {counter:0,listUsers:[]}
//     }
//
//     componentDidMount() {
//         let newList = this.state.listUsers.concat(this.getMoreItems());
//         this.setState({counter:this.state.counter+1,listUsers:newList});
//     }
//
//     getMoreItems = () => {
//         let copyListUsers = [];
//         for (let i=this.state.counter;i<this.state.counter+10;i++) {
//             copyListUsers.push(`Macadamia ${i}`);
//         }
//         return (
//             <>
//                 {
//                     copyListUsers.map(item => (
//                         <div
//                           style={{
//                             width: '300px',
//                             height: '160px',
//                             display: 'inline-block',
//                             backgroundColor: 'yellow',
//                             marginRight: '10px'}}>
//                               {item}
//                         </div>
//                     ))
//                 }
//             </>
//         )
//     }
//
//     loadMoreUsers = () => {
//         alert("KELUAR LHO");
//         let newList = this.state.listUsers.concat(this.getMoreItems());
//         this.setState({counter:this.state.counter+11,listUsers:newList});
//     }
//
//
//     render() {
//         return (
//             <div className="container">
//                 <div className="row" style={{height:'100vh'}}>
//                     <div className="col-12 align-self-start">
//                         <div className="row align-items-center">
//                             <div className="col-6 text-left">
//                                 <h1>Qoala Test</h1>
//                             </div>
//                             <div className="col-6 text-right">
//                                 <button>Color</button>
//                                 &nbsp;&nbsp;&nbsp;
//                                 <button>Cities</button>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="col-12">
//                         <div className="d-none d-md-block">
//                             <div
//                               style={{
//                                 width: '100%',
//                                 height: '200px',
//                                 WebkitOverflowScrolling: 'touch'
//                               }}>
//                                 <InfiniteScroll onReachRight={this.loadMoreUsers} horizontal>
//                                     {this.state.listUsers}
//                                 </InfiniteScroll>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         )
//     }
// }

export default Home;
