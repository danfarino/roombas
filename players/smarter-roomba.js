function* smarterRoomba(io){
    const strikingDistance = roombaRadius * 2.2;
    const lowEnergy = startingEnergy * 0.2;

    let lastIdAttacked = null;

    while (true){
        const others = [];
        for (const otherPlayer of io.players){
            if (otherPlayer.id != io.playerId){
                others.push({
                    distance: calculateDistance(io.position.x, io.position.y, otherPlayer.position.x, otherPlayer.position.y),
                    player: otherPlayer
                });
            }
        }

        if (others.length == 0){
            // victory dance
            while (true){
                for (let i = 0; i < 120; i++){
                    io.faceAngle += 5;
                    yield;
                }

                for (let i = 0; i < 120; i++){
                    io.faceAngle -= 5;
                    yield;
                }
            }
        }

        let enemy = null;

        if (lastIdAttacked){
            const lastEnemy = others.find(other => other.player.id == lastIdAttacked);
            if (lastEnemy && lastEnemy.distance < strikingDistance * 1.5){
                enemy = lastEnemy;
            }
        }

        if (!enemy){
            others.sort((a, b) => a.distance - b.distance);
            enemy = others[0];
        }

        io.faceAngle = calculateAngle(enemy.player.position.x, enemy.player.position.y, io.position.x, io.position.y) * (180/Math.PI);

        if (io.energy > (Math.random() * lowEnergy / 2) + lowEnergy){
            // attack
            io.moveAngle = io.faceAngle;
            if (enemy.distance < strikingDistance){
                io.shock = true;
                lastIdAttacked = enemy.playerId;
            }
            yield;
        }
        else {
            // retreat
            const c = Math.random() * 3 + 1;
            for (let i = 0; i < c; i++){
                io.moveAngle = io.faceAngle - 180;
                yield;
            }
        }
    }
}