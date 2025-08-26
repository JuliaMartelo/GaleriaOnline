import "./Card.css"
import imgPen from "../../assets/img/pen.svg"
import imgTrash from "../../assets/img/trash.svg"



export const Card = ({tituloCard, imgCard, funcaoEditar,funcaoExcluir}) => {
    return (
        <>

        <div className="cardDaImagem">
            <p>{tituloCard}</p>
            <img className="imgDoCard" src={imgCard} alt="Imagem relacionada ao card." />

            <div className="icons">
                <img src={imgPen} onClick={funcaoEditar} alt="Icone de caneta para realizar uma alteracao" />
                <img src={imgTrash}onClick={funcaoExcluir} alt="Icone de uma lixeira para realizar a exclusao" />
            </div>
        </div>
        </>
    )
}