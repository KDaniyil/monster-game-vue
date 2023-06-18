function getRandomValue(min, max){
    return Math.floor(Math.random() * (max -min) ) +5;
}

Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            rounds: 0
        }
    },
    methods: {
        attackMonster(){
            const attackValue = getRandomValue(5,12)
            this.monsterHealth = this.monsterHealth - attackValue;
            this.attackPlayer();
        },
        attackPlayer(){
            const attackValue = getRandomValue(8,15)
            this.playerHealth = this.playerHealth - attackValue;
            this.rounds++
        },
        specialAttackMonster(){
            const attackValue = getRandomValue(10,25)
            this.monsterHealth = this.monsterHealth - attackValue;
            this.attackPlayer();
        },
        healPlayer(){
            const healValue = getRandomValue(8,20)
            if(this.playerHealth + healValue > 100){
                this.playerHealth = 100
            }else{
                this.playerHealth += healValue
            }
            
        }
    },
    computed: {
        monsterBarStyles(){
            return {width: this.monsterHealth + '%'}
        },
        playerBarStyles(){
            return {width: this.playerHealth + '%'}
        },
        mayUseSpecialAttack(){
            return this.rounds === 0 || this.rounds % 3 !== 0;
        }
    },
}).mount("#game")