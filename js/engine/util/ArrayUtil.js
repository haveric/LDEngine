const ArrayUtil = {
    /*
    randomizeArray: function(array) {
        var currentIndex = array.length;
        var temp;
        var randomIndex;

        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temp = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = array[temp];
        }

        return array;
    },
    */
    create2dArray: function(numRows) {
        const array = [];

        for (let i = 0; i < numRows; i++) {
            array[i] = [];
        }
        return array;
    }
}