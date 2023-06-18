function getRandomValue(min, max){
    return Math.floor(Math.random() * (max -min) ) +5;
}

Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            rounds: 0,
            winner: null,
            logMessages:[],
            disableHealth : true
        }
    },
    methods: {
        startGame(){
            this.playerHealth = 100,
            this.monsterHealth = 100,
            this.rounds =0,
            this.winner = null,
            this.logMessages = [],
            this.disableHealth = true 
        },
        attackMonster(){
            const attackValue = getRandomValue(5,12);
            this.monsterHealth = this.monsterHealth - attackValue;
            this.addLogMessage('player', 'attack', attackValue);
            this.attackPlayer();
           
        },
        attackPlayer(){
            this.rounds++;
            const attackValue = getRandomValue(8,15);
            this.playerHealth = this.playerHealth - attackValue;
            this.addLogMessage('monster', 'attack', attackValue);    
        },
        specialAttackMonster(){
            const attackValue = getRandomValue(10,25);
            this.monsterHealth = this.monsterHealth - attackValue;
            this.addLogMessage('player', 'special-attack', attackValue);
            this.attackPlayer();
        },
        healPlayer(){
            const healValue = getRandomValue(8,20)
           
            if(this.playerHealth + healValue > 100){
                this.playerHealth = 100;
            }else{
                this.playerHealth += healValue;
            }
            this.addLogMessage('player', 'heal', healValue);
            
        },
        surrender(){
            this.winner = "monster";
        },
        addLogMessage(who, what, value){
            this.logMessages.unshift({
                actionBy:who,
                actionType: what,
                actionValue: value,
            });
        }
    },
    computed: {
        monsterBarStyles(){
            if(this.monsterHealth < 0){
                return {width: '0%'};
            }
            return {width: this.monsterHealth + '%'}
        },
        playerBarStyles(){
            if(this.playerHealth < 0){
                return {width: '0%'};
            }
            return {width: this.playerHealth + '%'}
        },
        mayUseSpecialAttack(){
            return this.rounds === 0 || this.rounds % 3 !== 0;
        }
    },
    watch: {
        playerHealth(value){
            if(value <= 0 && this.monsterHealth <= 0){
                //draw
                this.winner = "draw"
            } else if (value<= 0){
                //player lost
                this.winner = "monster"
            }
            if(value < 100){
                this.disableHealth = false;
            } else{
                this.disableHealth = true;
            }
        },
        monsterHealth(value){
            if(value <= 0 && this.playerHealth <= 0){
                //draw
                this.winner = "draw"
            } else if (value<= 0){
                //monster lost
                this.winner = "player"
            }
        },
        
    },
}).mount("#game")