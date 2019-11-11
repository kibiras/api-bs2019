CREATE VIEW users_results AS SELECT * FROM event
WHERE event_name IN ("raceStart", "raceFinished")