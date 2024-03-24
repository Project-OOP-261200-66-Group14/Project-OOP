package Region;

import Player.Player;

public interface IRegion {

//    bolean isCityCenter();

    long getDeposit();

    void changeCityCenter(Player owner);

   abstract void updateDeposit();





}
