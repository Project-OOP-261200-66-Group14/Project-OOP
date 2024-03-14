package Player;

public interface IPlayer {


    public Player getOwner();
    public String getName();
    public boolean updateBudget(long amount);
    public long getBudget();
}
