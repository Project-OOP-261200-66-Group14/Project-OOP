package Region;

public class Region implements IRegion {

    private double deposit;
    private int curRow;
    private int curCol;
    private int maxDeposit;

    public Region()


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
    public void changeCityCenter() {

    }

    @Override
    public void updateDeposit() {

    }

//    public int getCurRol(){
//
//    };
//    public void setCurRol(){
//
//    };


//  private Player.Player owner;
//  private Player.Player getOwner;



}
