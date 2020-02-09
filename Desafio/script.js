let alunos = [];
let aluno = {};
let totalAlunos = 0;
let formularioAluno = document.querySelector('.modal-body').innerHTML;

function verificaNota(nota1, nota2){
	let media = (nota1 + nota2) / 2;
	return media;
}

function verificaAprovacao(aluno){
	let aprovado = false;
	let verificaAluno = aluno;
	let notaFinal = (parseFloat(verificaAluno.semestreUm) + parseFloat(verificaAluno.semestreDois)) / 2;
	aluno.media = parseFloat(notaFinal).toFixed(2);

	if(verificaAluno.frequencia < 75){
		return aprovado = false;
	} else if(notaFinal < 6.0){
		return aprovado = false;
	} else{
		return aprovado = true;
	}

	console.log(aprovado);
}
function verificaFormulario(){
	let valida = true;

	if(document.getElementById("input-nome").value == ''){
		valida = false;
	}
	if(document.getElementById("input-semestre1").value == ''){
		valida = false;
	}
	if(document.getElementById("input-semestre2").value == ''){
		valida = false;
	}
	if(document.getElementById("input-frequencia").value == ''){
		valida = false;
	}
	return valida;
}
function cadastraAluno(){
	let verificaDados = verificaFormulario();

	if(verificaDados){
		aluno.nome = document.getElementById("input-nome").value;
		aluno.nome = aluno.nome.charAt(0).toUpperCase() + aluno.nome.substr(1).toLowerCase();

		aluno.semestreUm = parseFloat(document.getElementById("input-semestre1").value).toFixed(2);
		aluno.semestreDois = parseFloat(document.getElementById("input-semestre2").value).toFixed(2);
		aluno.frequencia = parseFloat(document.getElementById("input-frequencia").value).toFixed(2);
		aluno.aprovado = verificaAprovacao(aluno);

		alunos.push(aluno);

		document.getElementById('botao-salvar').style.display = "none";
		document.getElementById('cadastra-outro').style.display = "block";
		document.getElementById('conclui-cadastro').style.display = "block";

		document.querySelector('.modal-body').innerHTML = "<p> Deseja cadastrar outro aluno?</p>";
	}else{
		document.querySelector('.msg-alerta').innerHTML = "<p class='alert alert-danger' role='alert'>Preencha todos os campos.</p>";
	}
}

function continuarCadastro(){
	aluno = {};
	document.getElementById('botao-salvar').style.display = "block";
	document.getElementById('cadastra-outro').style.display = "none";
	document.getElementById('conclui-cadastro').style.display = "none";	

	document.querySelector('.modal-body').innerHTML = formularioAluno;
}

function imprimeTabela(){
	let tabela = document.querySelector('table');
	let tabelaDados = document.querySelector('.table thead');

	for(var i = 0; i < alunos.length ; i++){
		let linhaCor = "";
		totalAlunos++;

		if(alunos[i].aprovado){
			linhaCor = "aprovado";
		}else{
			linhaCor = "reprovado";
		}
		tabelaDados.innerHTML += "<tr class='aluno-tabela " + linhaCor + "''><th>" + totalAlunos + "</th>" +
		"<th>" + alunos[i].nome + "</th>" +
		"<th>" + alunos[i].semestreUm + "</th>" +
		"<th>" + alunos[i].semestreDois + "</th>" +
		"<th>" + alunos[i].media + "</th>" +
		"<th class='freq-bef'>" + alunos[i].frequencia + "</th></tr>";
	}
	alunos = [];
}

function maxLengthCheck(object) {
	object.className = "form-control";
	object.placeholder = "";
	document.querySelector('.nota-alerta').innerHTML = '';
	if (object.value.length > 4)
		object.value = object.value.slice(0, 4);
	if (object.value > 10){
		object.placeholder = object.value;
		object.value = '';
		object.className += " erro-estilo";
		document.querySelector('.nota-alerta').innerHTML = "<p class='alert alert-danger' role='alert'>Digite um número menor ou igual a 10</p>";
	}
}

function frequenciaLength(object){
	object.className = "form-control";
	object.placeholder = "";
	document.querySelector('.freq-alerta').innerHTML = '';
	if(object.value.length > 4)
		object.value = object.value.slice(0, 4);
	if(object.value > 100){
		object.placeholder = object.value;
		object.value = '';
		object.className += " erro-estilo";
		document.querySelector('.freq-alerta').innerHTML = "<p class='alert alert-danger' role='alert'>Digite um número menor ou igual a 100<p>";
	}
}