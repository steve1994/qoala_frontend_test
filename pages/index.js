import React, { useState, useEffect, Component } from 'react';
import InfiniteScroll from 'react-bidirectional-infinite-scroll';
import {fetchApiUsers} from '../services/api';
import * as func from '../helper/util';
import './css/index.css';

const Home = () => {

    const [numPage, setNumPage] = useState(1);
    const [listUsersData, setListUsersData] = useState([]);
    const [listUsersUIHorizontal, setListUsersUIHorizontal] = useState([]);
    const [listUsersUIVertical, setListUsersUIVertical] = useState([]);

    useEffect(() => {
        fetchApiUsers()
        .then(data => {
            let temporaryData = localStorage.getItem('listUsers100') ? JSON.parse(localStorage.getItem('listUsers100')) : [];
            if (temporaryData.length == 0) {
                temporaryData = data.results;
                setListUsersData(data.results);
            } else {
                setListUsersData(temporaryData);
            }
            let listAddedComponentHorizontal = loadUsersComponentHorizontal(temporaryData.slice(0,10));
            let listAddedComponentVertical = loadUsersComponentVertical(temporaryData.slice(0,10));
            setListUsersUIHorizontal(listUsersUIHorizontal.concat(listAddedComponentHorizontal));
            setListUsersUIVertical(listUsersUIVertical.concat(listAddedComponentVertical));
        })
    }, [])

    useEffect(() => {
        return () => {
            localStorage.setItem('listUsers100',JSON.stringify(listUsersData));
        }
    })

    const loadUsersComponentHorizontal = (data) => {
        return (
            <>
                {data.map(item => (
                    <div
                      className="row p-4"
                      style={{
                        width: '350px',
                        height: '60vh',
                        display: 'inline-block',
                        backgroundColor: func.determineBackgroundColorBasedOnAge(item.dob.age),
                        marginRight: '50px'}}>
                          <div className="col-12 text-center mb-3" style={{overflowX:'scroll'}}>
                              <img src={item.picture.large} style={{width:'150px'}} />
                          </div>
                          <div className="col-12" style={{overflowX:'scroll'}}>
                              {item.name.title}{' '}{item.name.first}{' '}{item.name.last}
                          </div>
                          <div className="col-12 mb-3" style={{overflowX:'scroll'}}>
                              Age : {item.dob.age}
                          </div>
                          <div className="col-12 mb-3" style={{overflowX:'scroll'}}>
                              Location : {item.location.city}{', '}{item.location.state}{', '}{item.location.postcode}
                          </div>
                          <div className="col-12" style={{overflowX:'scroll'}}>
                              Email : {item.email}
                          </div>
                    </div>
                ))}
            </>
        )
    }

    const loadUsersComponentVertical = (data) => {
        return (
            <>
                {data.map(item => (
                    <div
                      className="row p-4"
                      style={{
                        width: '100vw',
                        height: '100vw',
                        backgroundColor: func.determineBackgroundColorBasedOnAge(item.dob.age),
                        marginBottom: '50px'}}>
                          <div className="col-12 mb-3">
                              <div className="row">
                                  <div className="col-5 text-left">
                                      <img src={item.picture.large} style={{width:'100%'}} />
                                  </div>
                                  <div className="col-7 text-left">
                                      <div className="row h-100">
                                          <div className="col-12 mb-3" style={{overflowX:'scroll'}}>
                                              {item.name.title}{' '}{item.name.first}{' '}{item.name.last}
                                          </div>
                                          <div className="col-12 mb-3" style={{overflowX:'scroll'}}>
                                              Age : {item.dob.age}
                                          </div>
                                          <div className="col-12" style={{overflowX:'scroll'}}>
                                              Email : {item.email}
                                          </div>
                                      </div>
                                  </div>
                              </div>
                          </div>
                          <div className="col-12" style={{overflowX:'scroll'}}>
                              Location : {item.location.city}{', '}{item.location.state}{', '}{item.location.postcode}
                          </div>
                    </div>
                ))}
            </>
        )
    }

    const loadMoreUsers = () => {
        if (numPage + 1 <= 10) {
            let listAddedComponentHorizontal = loadUsersComponentHorizontal(listUsersData.slice(numPage*10,(numPage+1)*10));
            let listAddedComponentVertical = loadUsersComponentVertical(listUsersData.slice(numPage*10,(numPage+1)*10));
            setListUsersUIHorizontal(listUsersUIHorizontal.concat(listAddedComponentHorizontal));
            setListUsersUIVertical(listUsersUIVertical.concat(listAddedComponentVertical));
            setNumPage(numPage + 1);
        }
    }

    const groupItemBasedOnColor = (event) => {
        let currentDataDisplayed = listUsersData.slice(0,numPage*10);
        let groupedBasedColorResult = func.mergeGroupUserByAgeReducer(func.groupUserByAge(currentDataDisplayed));
        setListUsersUIHorizontal([loadUsersComponentHorizontal(groupedBasedColorResult)]);
        setListUsersUIVertical([loadUsersComponentVertical(groupedBasedColorResult)]);
    }

    const sortItemBasedOnCity = (event) => {
        let currentDataDisplayed = listUsersData.slice(0,numPage*10);
        let sortedBasedCityResult = func.sortUserByCity(currentDataDisplayed);
        setListUsersUIHorizontal([loadUsersComponentHorizontal(sortedBasedCityResult)]);
        setListUsersUIVertical([loadUsersComponentVertical(sortedBasedCityResult)]);
    }

    return (
        <div className="container">
            <div className="row" style={{height:'100vh'}}>
                <div className="col-12 my-3 align-self-start">
                    <div className="row align-items-center">
                        <div className="col-6 text-left">
                            <h1>Qoala Test</h1>
                        </div>
                        <div className="col-6 text-right">
                            <button onClick={groupItemBasedOnColor}>Color</button>
                            &nbsp;&nbsp;&nbsp;
                            <button onClick={sortItemBasedOnCity}>Cities</button>
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
                            <InfiniteScroll onReachRight={loadMoreUsers} horizontal>
                                {listUsersUIHorizontal}
                            </InfiniteScroll>
                        </div>
                    </div>
                    <div className="d-lg-none">
                        <div
                          style={{
                            width: '100vw',
                            height: '100vh',
                            WebkitOverflowScrolling: 'touch'
                          }}>
                            <InfiniteScroll onReachBottom={loadMoreUsers} vertical>
                                {listUsersUIVertical}
                            </InfiniteScroll>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home;
