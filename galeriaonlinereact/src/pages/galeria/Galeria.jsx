import './Galeria.css'
import icon from "../../assets/img/upload.svg"
import { Botao } from "../../components/botao/Botao"
import { Card } from '../../components/card/Card'
import { useEffect, useState } from 'react'
import api from "../../Services/services";
import Swal from "sweetalert2";






export const Galeria = () => {



    const [cards, setCards] = useState([]);
    const [imagem, setImagem] = useState(null);
    const [nomeImagem, setNomeImagem] = useState("");

    async function listarCard() {
        try {
            //Mandar as informacoes
            const resposta = await api.get("Imagem");
            console.log("Cards listados com sucesso:", resposta.data);

            // console.log(resposta)/
            setCards(resposta.data)
        } catch (error) {
            console.error(error);
            Swal.fire({
                title: "Drag me!",
                icon: "erro",
                draggable: true
            });
        }
    }

    async function cadastrarCard(e) {
        e.preventDefault();
        if (imagem && nomeImagem) {
            try {
                // FormData e uma interface JavaScript que permite construir um conjunto de pares chave/valor representando os dados de um formulario HTML
                const formData = new FormData();
                // apped: anexar/acrescentar/adicinar
                formData.append("Nome", nomeImagem);
                formData.append("Arquivo", imagem);

                await api.post("Imagem/upload", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data"
                    }
                });
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                });
                Toast.fire({
                    icon: "success",
                    title: "Voce realizou o cadastro!"
                });

            } catch (error) {
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    }
                });
                Toast.fire({
                    icon: "error",
                    title: "Erro ao realizar o cadastro!"
                });

            }
        } else {
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({
                icon: "error",
                title: "Preencha todos os campos!"
            });
        }
    }

    function editarCard(id, nomeAntigo) {

        const novoNome = prompt("Digite o novo nome da imagem:", nomeAntigo);

        const inputArquivo = document.createElement("input");
        inputArquivo.type = "file";
        inputArquivo.accept = "image/*";

        inputArquivo.onchange = async (e) => {
            const novoArquivo = e.target.files[0];

            const formData = new FormData();

            formData.append("Nome", novoNome);
            formData.append("Arquivo", novoArquivo);

            if (formData) {
                try {
                    await api.put(`Imagem/${id}`, formData, {
                        headers: {
                            "Content-Type": "multipart/form-data"
                        }
                    })
                    const Toast = Swal.mixin({
                        toast: true,
                        position: "top-end",
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.onmouseenter = Swal.stopTimer;
                            toast.onmouseleave = Swal.resumeTimer;
                        }
                    });
                    Toast.fire({
                        icon: "success",
                        title: "Editado com sucesso!"
                    });
                } catch (error) {
                    const Toast = Swal.mixin({
                        toast: true,

                        position: "top-end",
                        showConfirmButton: false,
                        timer: 3000,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.onmouseenter = Swal.stopTimer;
                            toast.onmouseleave = Swal.resumeTimer;
                        }
                    });
                    Toast.fire({
                        icon: "error",
                        title: "Nao foi possivel alterar o card!"
                    });
                }
            }
        }
        inputArquivo.click();
    }

    async function excluirCard(id) {
        try {
            await api.delete(`Imagem/${id}`)
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({
                icon: "success",
                title: "Excluido com sucesso!"
            });
        } catch (error) {
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 3000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                }
            });
            Toast.fire({
                icon: "error",
                title: "Erro ao excluir!"
            });
        }
    }

    useEffect(() => {
        listarCard();
    });

    return (
        <>
            <h1 className='tituloGaleria'>Galeria Online</h1>

            <form className='formulario' onSubmit={cadastrarCard}>
                <div className='campoNome'>
                    <label>Nome</label>
                    <input type="text" className='inputNome'
                        onChange={(e) => setNomeImagem(e.target.value)}
                        value={nomeImagem}
                    />
                </div>
                <div className='campoImagem'>
                    <label className='arquivoLabel'>
                        <i> <img src={icon} alt='Icone de upload de imagem' /> </i>
                        <input type="file" className='arquivoInput'
                            onChange={(e) => setImagem(e.target.files[0])}
                        />
                    </label>
                </div>
                <Botao nomeBotao="Cadastrar" />
            </form>

            <div className='campoCards'>
                {cards.length > 0 ? (
                    cards.map((e) => (
                        <Card
                            key={e.id}
                            tituloCard={e.nome}
                            imgCard={`https://localhost:7028/${e.caminho.replace("wwwroot/", "")}`}
                            funcaoExcluir={() => excluirCard(e.id)}
                            funcaoEditar={() => editarCard(e.id, e.nome)}
                        />

                    ))

                ) : <p>Nennhum card cadastrado!</p>}
            </div>
        </>
    )
}