let app = new Vue({
  el: "#root",

  data: {
    message: 'Flying above the surface of the earth you have tracked the Bot to this location.\n' +
              'He has taken cover under one of these trees. Find him by clicking on one of them.\n' +
              'However, every time you look and dont find him he will move.\n' +
              'But! You have a handy tracker that will tell you how many squares away from the tree you selected he moved to.\n' +
              'But you forgot to update the new Windows software so it doesnt tell you if you should go positive or negative\n' +
              ' in the x/y dirrections.' +
              'GOOD LUCK!',
    x_message: '',
    y_message: '',
    count: 0,
    available_x: [],
    rows: [],
    botAt: {
      x_axis: '',
      y_axis: ''
    }
  },

  methods: {
    build() {
      var i, j;
      for (i = 0; i < 15; i++) {
        var row = [];
        var available_y = [i];
        for (j = 0; j < 15; j++) {
          var c = {x: '', y: '', visited: '', here: ''};
          c.x= i;
          c.y= j;
          c.visited = false;
          c.here = false;
          row.push(c);

          available_y.push(j);
        }
        this.rows.push(row);
        this.available_x.push(available_y);
      }
      var placeBotx = Math.floor(Math.random() * (9 - 0 + 1)) + 0;
      var placeBoty = Math.floor(Math.random() * (9 - 0 + 1)) + 0;
      console.log(placeBotx, placeBoty, this.rows[placeBotx][placeBoty]);
      this.rows[placeBotx][placeBoty].here = true;
      this.botAt.x_axis=placeBotx;
      this.botAt.y_axis=placeBoty;
    },
    updateAvailable(c_x, c_y) {
      for (var i = 0; i < this.available_x.length; i++) {
        var y_ar = this.available_x[i];
        if (y_ar[0] === c_x) {
          for (var j = 1; j < y_ar.length; j++) {
            if (y_ar[j] === c_y) {
              y_ar.splice(j,1);
              if (y_ar.length === 1) {
                this.available_x.splice(i,1);
              }
              break;
            }
          }
          break;
        }
      }
    },
    moveBot() {
      // Set the current spot to false
      this.rows[this.botAt.x_axis][this.botAt.y_axis].here = false

      // Find available coordinates to move Bot to non visited square.
      var newXi = Math.floor(Math.random() * (this.available_x.length-1 - 0 + 1));
      //this.available_x[newXi][0] is the available y axis with unvisited x spots.

      var ar = this.available_x[newXi];
      var newYi = Math.floor(Math.random() * (ar.length - 1 - 0 + 1));
      if (newYi === 0) {
        newYi = 1;
      }

      var newX = this.available_x[newXi][0];
      var newY = this.available_x[newXi][newYi];
      console.log(newX, newY); //the new coordinates for the bot

      this.rows[newX][newY].here = true;
      console.log(this.rows[newX][newY]);
      this.botAt.x_axis = newX;
      this.botAt.y_axis = newY;

    },
    search(c) {
      if (c.here) {
        alert("Congrats! You found the Bot!");

        this.restart();
      }
      else if (!c.visited) {
        c.visited = true;
        this.updateAvailable(c.x, c.y);
        this.moveBot();
        var xsteps = Math.abs(c.x - this.botAt.x_axis);
        var ysteps = Math.abs(c.y - this.botAt.y_axis);
        this.message = "BOT MOVED!"
        this.x_message = "x: (+/-)" + ysteps + " trees";
        this.y_message = "y: (+/-)" + xsteps + " trees";
        this.count = this.count + 1;
      }
      else {
        alert("already clicked, choose another one");
      }
    },
    restart() {
      this.rows=[];
      this.message= "New Game";
      this.x_message= '';
      this.y_message= '';
      this.count = 0;
      this.build();
    }
  },

  mounted() {
      this.build();
  }

});
