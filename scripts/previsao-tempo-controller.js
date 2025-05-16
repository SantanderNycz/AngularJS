angular
  .module("aplicacao")
  .controller("PrevisaoTempoController", function ($scope, $resource) {
    var WheatherChannel = $resource(
      "http://api.openweathermap.org/data/2.5/weather?q=SaoPaulo,BR&units=metric&APPID={{{{APIKEY}}}}"
    );

    var getWeather = function () {
      WheatherChannel.get().$promise.then(
        function (response) {
          $scope.tempo = response;
          console.log(response);
        },
        function (promise) {
          alert("Erro ao requisitar Recurso!");
        }
      );
    };
  });
