import React, { Component } from 'react';

class SlideButton extends Component {
    constructor() {
        super();
        this.state = {
            property: '',
            lastMove: 0,
            windowWidth:innerWidth
        };
    }
    getState() {
        return this.state.property
    }
    render() {
        this.state.property = this.props.property
        console.log("STATE.WINDOW:"+this.state.windowWidth)
        return (
            <div className="slideBtns">
                <div className="slide_btn slide_left">
                </div>
                <div className="slide_btn slide_right">
                </div>
            </div>
        )
    }
    componentDidMount() {
        let left = document.getElementsByClassName('slide_left')[0];
        let right = document.getElementsByClassName('slide_right')[0];
        let moveSlide = (arg) => {
            let winWidth = window.innerWidth; //寬度
            let displayCol = this.state.property.count.show; //顯示行數
            let colWidth = 100 / displayCol; //每行寬度
            let moveColCount = this.state.property.count.slide; //移動行數
            let moveSpeed = this.state.property.speed; //移動速度
            let slide = document.getElementsByClassName('slide');
            let slideLength=slide[0].length; //全長
            let moveRange = moveColCount * colWidth;
            let maxMove = (colWidth * (slide[0].children.length)) - (colWidth * moveColCount)

            console.log("max:" + maxMove);
            console.log(`translateX(${this.state.lastMove}%)`)
            if (winWidth <= 768) {
                //0-往右 , 1-往左
                if (arg == 0) {
                    this.state.lastMove += moveRange;
                    maxMove = 0;
                    for (let i = 0; i < slide.length; i++) {
                        if (Math.round(this.state.lastMove) > maxMove) {
                            slide[i].style.transform = `translateX(${this.state.lastMove}%)`;
                            slide[i].style.transition = `all ease-in-out ${moveSpeed}s`;
                        }
                    }
                }
                else {
                    this.state.lastMove -= moveColCount * colWidth;
                    maxMove = (maxMove - maxMove * 2)
                    for (let i = 0; i < slide.length; i++) {
                        if (Math.round(this.state.lastMove) > maxMove) {
                            slide[i].style.transform = `translateX(${this.state.lastMove}%)`;
                            slide[i].style.transition = `all ease-in-out ${moveSpeed}s`;
                        }
                    }
                }
            }
            // for (let i = 0; i < slide.length; i++) {
            //     if (Math.round(this.state.lastMove) < maxMove) {
            //         slide[i].style.transform = `translateX(${this.state.lastMove}%)`;
            //         slide[i].style.transition = `all ease-in-out ${moveSpeed}s`;
            //     }
            // }
        }
        left.addEventListener('click', function () {
            moveSlide(1);
        })
        right.addEventListener('click', function () {
            moveSlide(0);
        })
    }
}

export default SlideButton;