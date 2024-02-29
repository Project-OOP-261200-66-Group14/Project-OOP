package Player;

import Region.Region;

public class Player extends Region implements IPlayer {
    private long budget;
    private String name;

    public Player(long budget,String name){
        this.budget = budget;
        this.name = name =name;

    }

    @Override
    public long getBudget() {
        return budget;
    }

    @Override
    public bolean updateBudget(long amount) {
        bolean totalBudget = budget + amount >= 0;
        budget = Math.max(0,budget + amount);
        return totalBudget;

    }

    @Override
    public String getName() {
        return name;
    }

    @Override
    public Player getOwner() {
        return null;
    }


}
