function* stupidRoomba(io){
    const angerLevel = 0.1;
    while (true){
        io.faceAngle += Math.random() * 20 - 10;
        io.moveAngle = io.faceAngle;
        io.shock = Math.random() < angerLevel;
        yield;

        if (io.shockedBy.length > 0){           
            console.log(`${io.playerId} shocked by ${io.shockedBy.join(', ')}`);
        }
    }
}
