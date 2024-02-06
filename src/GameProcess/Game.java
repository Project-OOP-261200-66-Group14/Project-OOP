package GameProcess;

public interface Game {

    void getConstructionPlan(String constructionPlan);

    boolean collect(long totalValue);
    boolean invest(long totalValue);
    boolean relocate();


    long opponent();
    long budget();
    long getTurn();
}
