package Statement;

import java.util.List;
import java.util.Map;

public class BlockStatement implements Expr{
    private List<Expr> statements;

    public BlockStatement(List<Expr> statements) {
        this.statements = statements;
    }

    @Override
    public void prettyPrint(StringBuilder s) {
        s.append("{");
        for (Expr statement : statements) {
            statement.prettyPrint(s);
            s.append("\n");
        }
        s.append("}");
    }

    @Override
    public int eval(Map<String, Integer> bindings) throws EvalError {
        return 0;
    }
}
