import { Player } from '../containers/Board';
import '../index.css'

export default function Square({
    value,onClick,winner
} :{
    value:Player;
    winner:Player;
    onClick: () => void
}){
    if(!value){
        return <button className="square"  onClick={onClick} disabled={Boolean(winner)}/>
    }
    return <button className={`square square_${value.toLocaleLowerCase()}`} disabled>{value}</button>
}