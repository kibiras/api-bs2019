select 
max(users.id) as reg_id,
race_id, 
api_pc_id as car_id, 
username, 
whole_race_time_player2/1000 as total_time,
date
from users
INNER JOIN users_results ON  users.game_id = users_results.race_id AND users.api_pc_id = users_results.which_player_caused
WHERE users_results.event_name = 'raceFinished' AND api_pc_id = 1
GROUP BY api_pc_id, race_id

UNION ALL

select
max(users.id) as reg_id,
race_id, 
api_pc_id as car_id, 
username, 
whole_race_time_player1/1000 as total_time,
date
from users
INNER JOIN users_results ON  users.game_id = users_results.race_id AND users.api_pc_id = users_results.which_player_caused
WHERE users_results.event_name = 'raceFinished' AND api_pc_id = 0 
GROUP BY api_pc_id, race_id
ORDER BY total_time