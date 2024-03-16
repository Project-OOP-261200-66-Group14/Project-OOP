package Region;

import Player.Player;

public class Region implements IRegion {

    private long deposit;
    private int curRow;
    private int curCol;
    private long maxDeposit;
    private player owner;
    private boolean isCityCenter;

    public Region(long maxDeposit ){
        this.maxDeposit = maxDeposit;
        this.owner = null;
        this.isCityCenter = false;
        this.deposit = 0;

    }


    public int getCurRow(){
        return this.curRow;
    };
    public void setCurRow(int row){
        this.curRow = row;
    };

    @Override
    public long getDeposit() {
        return deposit;
    }

    @Override
    public void changeCityCenter(Player owner) {

    }



    @Override
    public void updateDeposit() {

    }

    @Override
    public void updateDeposit(long amount) {
        deposit = Math.max(0,amount + deposit);
        deposit = Math.min(maxDeposit,deposit);
    }

/


}
