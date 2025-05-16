angular
  .module("aplicacao")
  .controller(
    "ListagemAlunosController",
    function ($scope, $filter, AlunosCollectionService) {
      $scope.nome = "Leonardo Santander Nycz";
      var nome = "Lá ele";

      $scope.hoje = new Date();

      $scope.iniciado = true;
      $scope.cadastrar = false;

      $scope.alunos = AlunosCollectionService.getAlunos();

      $scope.finalizar = function () {
        $scope.iniciado = false;
      };

      $scope.iniciar = function () {
        $scope.iniciado = true;
      };

      $scope.ordernarPorNome = function () {
        AlunosCollectionService.ordernarPorNome();
        $scope.alunos = AlunosCollectionService.getAlunos();
      };

      $scope.ordernarPorIdade = function () {
        AlunosCollectionService.ordernarPorIdade();
        $scope.alunos = AlunosCollectionService.getAlunos();
      };

      $scope.exibeCadastro = function () {
        $scope.cadastrar = !$scope.cadastrar;
      };
    }
  );
