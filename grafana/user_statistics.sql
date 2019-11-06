select max(users.id) as reg_id, 
race_id, 
api_pc_id as car_id, 
username, 
email,  
CASE WHEN api_pc_id = 1 THEN (lap1time_player1 + lap2time_player1 + lap3time_player1)/1000 ELSE (lap1time_player2 + lap2time_player2 + lap3time_player2)/1000 END AS best_time,
date
from users
INNER JOIN users_results ON users.api_pc_id = users_results.which_player_caused AND users.game_id = users_results.race_id
WHERE users_results.event_name = 'raceFinished' 
GROUP BY api_pc_id, race_id
ORDER BY best_time