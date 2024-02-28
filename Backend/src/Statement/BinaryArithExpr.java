package Statement;

import java.util.Map;
import java.lang.Math;

public class BinaryArithExpr implements Expr {
    Expr left;
    String op;
    Expr right;

    public BinaryArithExpr (Expr left, String op, Expr right) {
        this.left = left;
        this.op = op;
        this.right = right;
    }

    @Override
    public void prettyPrint(StringBuilder s) {
        s.append("(");
        left.prettyPrint(s);
        s.append(op);
        right.prettyPrint(s);
        s.append(")");
    }

    @Override
    public int eval(Map<String, Integer> bindings) throws EvalError {
        int lv = left.eval(bindings);
        int rv = right.eval(bindings);
        if(op.equals("+")) return lv + rv;
        if(op.equals("-")) return lv - rv;
        if(op.equals("*")) return lv * rv;
        if(op.equals("/")) return lv / rv;
        if(op.equals("%")) return lv % rv;
        if (op.equals("^")) return (int) Math.pow(lv, rv);
        throw new EvalError("unknown op: " + op);
    }
}
