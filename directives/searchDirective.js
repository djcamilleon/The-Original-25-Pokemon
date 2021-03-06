angular.module('pokemon25').directive('searchDirective', function () {
    return {
        templateUrl: 'views/searchInfo.html',
        restrict: 'E',

        controller: function ($scope, searchService, $timeout) {

            $scope.getPokemon = searchService.getPokemon;
            $scope.getPokeImages = searchService.getPokeImages();

            $scope.next = function () {
                if ($scope.indexNum === 25) {
                    return;
                }
                $scope.indexNum++;
                $scope.getPokeData();
            }
            $scope.back = function () {
                if ($scope.indexNum === 1) {
                    return;
                }
                $scope.indexNum--;
                $scope.getPokeData();
            }
            $scope.prop = false
            $scope.loading = false;
            $scope.getPokeData = function () {
                $scope.loading = true;
                $scope.prop = false

                $scope.getPokemon($scope.indexNum).then(function (pokemonData) {
                    $timeout(function(){
                        $scope.loading = false;
                        $scope.prop = true;
                        console.log($scope.prop)
                    },500)
                    
                    console.log(pokemonData);

                    $scope.getPokeImages.then(function (response) {
                        console.log(response)
                        var images = response.data.images;
                        console.log('images', images)
                        $scope.poke = {
                            image: images[pokemonData.national_id],
                            'Name': pokemonData.name,
                            'NationalPokedexID': pokemonData.national_id,
                            'Weight': pokemonData.weight / 10,
                            'Height': pokemonData.height / 10,
                            'BaseSpeed': pokemonData.speed,
                            'BaseHitPoints': pokemonData.hp,
                            'BaseAttack': pokemonData.attack,
                            'BaseDefense': pokemonData.defense,
                            'BaseSpecialAttack': pokemonData.sp_atk,
                            'BaseSpecialDefense': pokemonData.sp_def,
                            'Move1': pokemonData.moves[0].name,
                            'Move2': pokemonData.moves[1].name,
                            'Move3': pokemonData.moves[2].name
                        }
                        console.log('images', $scope.poke.image)
                        console.log('poke',$scope.poke)
                    })



                    console.log($scope.poke);
                })
            }
        }
    }
})



