import { ReactElement, useState } from "react";
import eventEmitter from "@/app/helper/event"

interface ChildProps {
  inputXO: boolean,
  handleClick: (data: boolean) => void,
  currentPosition: number,
  updateBoard: (index: number, data: string) => void
}
const InputItem: React.FC<ChildProps> = ({ inputXO, handleClick, currentPosition, updateBoard }) => {
  const [inputXOLocal, setInputXOLocal] = useState(false)
  const [isStarted, setStart] = useState(false)
  const handleClickLocal = () => {
    if (!isStarted) {
      setStart(true)
      setInputXOLocal(inputXO)
      handleClick(!inputXO)
      updateBoard(currentPosition, inputXO ? 'o' : 'x')
    }
  }
  eventEmitter.on('reset', () => {
    setStart(false)
  })
  return (<>
    <div className="input-1 p-4" onClick={() => handleClickLocal()}>
      {isStarted && inputXOLocal ? (<div className="xo-o"></div>) : ''}
      {isStarted && !inputXOLocal ? (<div className="xo-x"></div>) : ''}
    </div>
  </>);
}

export default InputItem;