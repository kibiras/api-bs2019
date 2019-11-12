package se.seb.buildstuff.Domain;

import lombok.AllArgsConstructor;
import lombok.Data;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.*;
@Data
@AllArgsConstructor
@Entity
@JsonIgnoreProperties
public class Event {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Integer id;
    private Double raceId;
    private Double attentionlevel_Player1;
    private Double attentionlevel_Player2;
    @JsonProperty("Lap1Time_Player2")
    private Double Lap1Time_Player2;
    @JsonProperty("Lap1Time_Player1")
    private Double Lap1Time_Player1;
    private String eventName;

    @JsonProperty("Lap3Time_Player2")
    private Double Lap3Time_Player2;


    @JsonProperty("Lap3Time_Player1")
    private Double Lap3Time_Player1;

    @JsonProperty("Lap2Time_Player2")
    private Double Lap2Time_Player2;

    @JsonProperty("Lap2Time_Player1")
    private Double Lap2Time_Player1;

    @JsonProperty("WholeRaceTime_Player2")
    private Double WholeRaceTime_Player2;

    @JsonProperty("WholeRaceTime_Player1")
    private Double WholeRaceTime_Player1;

    private Double lapNumber_Player1;
    private Double lapNumber_Player2;

    private Double meditation1level_Player1;
    private Double meditation2level_Player2;

    private Double maxSpeedSettings_Player1;
    private Double maxSpeedSettings_Player2;



    @JsonProperty("CurrentLapTime_Player1")
    private Double CurrentLapTime_Player1;

    @JsonProperty("CurrentLapTime_Player2")
    private Double CurrentLapTime_Player2;
    private Double whichPlayerCaused;
    private Double speed_Player1;
    private Double speed_Player2;
    private Double time;
    @JsonProperty("GForceY_Player2")
    private Double GForceY_Player2;
    @JsonProperty("GForceY_Player1")
    private Double GForceY_Player1;
    @JsonProperty("GForceX_Player1")
    private Double GForceX_Player1;
    @JsonProperty("GForceX_Player2")
    private Double GForceX_Player2;
    public Event() {
    }
}
