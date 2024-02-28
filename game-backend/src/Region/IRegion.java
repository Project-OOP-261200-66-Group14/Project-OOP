package Region;

public interface IRegion {

    bolean isCityCenter();

    long getDeposit();

    void changeCityCenter();

    void updateDeposit(long amount);
    void setCityCenter(Player owner);



}
