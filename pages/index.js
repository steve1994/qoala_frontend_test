import React, { useState, useEffect, Component } from 'react';
import InfiniteScroll from 'react-bidirectional-infinite-scroll';
import {fetchApiUsers} from '../services/api';
import * as func from '../helper/util';
import '~/public/css/index.css';

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
            let temporaryNumPage = localStorage.getItem('page_listUsers100') ? parseInt(localStorage.getItem('page_listUsers100')) : 1;
            setNumPage(temporaryNumPage);

            let listAddedComponentHorizontal = loadUsersComponentHorizontal(temporaryData.slice(0,temporaryNumPage * 10));
            let listAddedComponentVertical = loadUsersComponentVertical(temporaryData.slice(0,temporaryNumPage * 10));
            setListUsersUIHorizontal(listUsersUIHorizontal.concat(listAddedComponentHorizontal));
            setListUsersUIVertical(listUsersUIVertical.concat(listAddedComponentVertical));
        })
    }, [])

    useEffect(() => {
        return () => {
            localStorage.setItem('listUsers100',JSON.stringify(listUsersData));
        }
    })

    useEffect(() => {
        return () => {
            let pageFromLocalStorage = localStorage.getItem('page_listUsers100') ? parseInt(localStorage.getItem('page_listUsers100')) : 1;
            if (pageFromLocalStorage == numPage) {
                localStorage.setItem('page_listUsers100',numPage+1);
            } else {
                localStorage.setItem('page_listUsers100',pageFromLocalStorage);
            }
        }
    }, [numPage])

    const loadUsersComponentHorizontal = (data) => {
        return (
            <>
                {data.map(item => (
                    <div className="row p-4 container-card-horizontal" style={{backgroundColor:func.determineBackgroundColorBasedOnAge(item.dob.age)}}>
                        <div className="col-12 text-center mb-3">
                            <img src={item.picture.large} style={{width:'150px'}} />
                        </div>
                        <div className="col-12">
                            {item.name.title}{' '}{item.name.first}{' '}{item.name.last}
                        </div>
                        <div className="col-12 mb-3">
                            Age : {item.dob.age}
                        </div>
                        <div className="col-12 mb-3">
                            Location : {item.location.city}{', '}{item.location.state}{', '}{item.location.postcode}
                        </div>
                        <div className="col-12">
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
                    <div className="row p-4 container-card-vertical" style={{backgroundColor: func.determineBackgroundColorBasedOnAge(item.dob.age)}}>
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
            alert("LOAD MORE USER");
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
                        <div className="col-4 text-left">
                            <h1>Qoala Test</h1>
                        </div>
                        <div className="col-8 text-right pr-0">
                            <button className="filter-button" onClick={groupItemBasedOnColor}>Color</button>
                            &nbsp;&nbsp;&nbsp;
                            <button className="filter-button" onClick={sortItemBasedOnCity}>Cities</button>
                        </div>
                    </div>
                </div>
                <div className="col-12">
                    <div className="d-none d-lg-block">
                        <div className="scroll-horizontal-window">
                            <InfiniteScroll onReachRight={loadMoreUsers} horizontal>
                                {listUsersUIHorizontal}
                            </InfiniteScroll>
                        </div>
                    </div>
                    <div className="d-lg-none">
                        <div className="scroll-vertical-window">
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
