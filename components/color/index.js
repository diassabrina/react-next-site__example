import React from 'react';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux'
import {actionColor} from './action';
import currencyformat from '../currencyformat'
import style from './style.scss';

import dot4 from '../../static/images/color/dot-red.png'
import dot5 from '../../static/images/color/dot-blue.png'
import dot6 from '../../static/images/color/dot-grey.png'

class Color extends React.Component {
	constructor(props) {
        super(props);
        const firstChoice = firstChoice ||  props.color.items[0];
        
        this.state = {
            image: firstChoice.image,
            label: firstChoice.label,
            price: firstChoice.price,
            selected : firstChoice.id,
        }
    }

    changeOption(e){  
        
        let el = this.props.color.items
            .filter((item)=>item.id == e.target.id)

        this.setState({
            image: el[0].image,
            label: el[0].label,
            price: el[0].price,
            selected : el[0].id,
        })

        return (
            this.props.actionColor(el[0])
        )
    }

    colorOptions({id, label}){
        let activeInput = this.state.selected == id ? 'checked' : '';
        let activeClass = this.state.selected == id ? style.active: ''; 
        const dots = [dot4, dot5, dot6]
        return(
            <li key={id} className={activeClass}>
                <label htmlFor={id}>
                    <img src={dots[id-4]} alt={label}/>
                    <span></span>
                    <input
                        type = "radio"
                        name = "color"
                        id = {id}
                        onChange = {e=> this.changeOption(e)}
                        checked = {activeInput}
                    />
                </label>                
            </li>
        ) 
    }
  
    
	render() {
		return (
			<section className={style.color}>
            
                <div className={style.top}>
                    <h1 className={style.title}>Color</h1>
                    <p className={style.description}>{this.props.color.description}</p>
                </div>

                <div className={style.bottom}>
                    <div className={style.colorImage}>
                        {/* imgOffset equilibra imagem de tamanho diferente */}
                        <img src={this.state.image} className={this.state.selected == '4' ? style.imgOffset : ''}/>

                        <label>
                            <p>{this.state.label}</p>
                            <span> 
                                {this.state.price ? currencyformat(this.state.price) : 'included'}
                            </span>
                        </label>
                        
                    </div>

                    <div className={style.colorOptions}>

                        <ul className={style.colorOptionsList}>
                            {this.props.color.items.map(({id, label})=>(
                                this.colorOptions({id, label})
                            ))}
                        </ul>

                    </div>
                </div>
                
            </section>
		);
	}
}

const mapStateToProps = (props) => (
    {           
        color: props.general.data.color,
        geral: props
    }
);

const mapDispatchToProps = (dispach) => {
    return bindActionCreators({actionColor},dispach)
}

export default connect(mapStateToProps, mapDispatchToProps)(Color);