package UpbeatGameController;
import java.util.Random;

import Teritory.Territory;

public class UpbeatGameController implements IUpbeatGameController {

    private Territory territory;
    @Override
    public void setUp() {
        territory = new Territory(20,15);
    }

    @Override
    public void random() {


    }



}
