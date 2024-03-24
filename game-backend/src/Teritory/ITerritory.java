package Teritory;

import Statement.DirectionType;

import javax.swing.text.Position;

public interface ITerritory {
    long getrows();
    long getcol();

    default ITerritory direction(DirectionType direction){

        boolean Check_isEven = getrows()%2==0;

        long rows = getrows();
        long cols = getcol();

        return switch (direction){
            case up -> Position.of(rows,cols-1);

        }
    }
}
