import React, { Component } from 'react'
import InfiniteScroll from 'react-bidirectional-infinite-scroll';

export default class HorizontalExample extends Component {
    state = {
        items: [],
        counter: 1
    }

    componentDidMount() {
        this.setState({
            items: [].concat(this.getItems())
        })
    }

    getItems = () => {
        const itemsLength = this.state.items.length
        const frequency = 0.3
        const red = Math.round(Math.sin(frequency * itemsLength + 0) * 127 + 128)
        const green = Math.round(Math.sin(frequency * itemsLength + 2) * 127 + 128)
        const blue = Math.round(Math.sin(frequency * itemsLength + 4) * 127 + 128)

        return (
            <div
              key={+new Date()}
              style={{
                width: '300px',
                height: '160px',
                display: 'inline-block',
                backgroundColor: 'yellow',
                marginRight: '10px'}}>
                Example {new Date().toLocaleString()}
            </div>
        )
    }

    handleScrollLeft = () => {
        const items = [].concat(this.getItems()).concat(this.state.items)
        setTimeout(() => { this.setState({ items }) }, 500)
    }

    handleScrollRight = () => {
        alert("REACH RIGHT");
        const items = this.state.items.concat(this.getItems())
        this.setState({ items });
    }

    handleOnScroll = (position, previousPosition) => {
        const diffScroll = position - previousPosition
        const direction = diffScroll > 0
          ? 'right'
          : 'left'

        console.log(`Scroll ${direction} to ${position}`)
    }

    render() {
        return (
            <div
              style={{
                width: '200px',
                height: '200px',
                WebkitOverflowScrolling: 'touch'
              }}>
              <InfiniteScroll
                onReachRight={this.handleScrollRight}
                horizontal>
                {this.state.items}
              </InfiniteScroll>
            </div>
        )
    }
}
